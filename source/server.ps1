param([int]$Port = 8765, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'www'))
$rootPrefix = $root + [IO.Path]::DirectorySeparatorChar
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
$mime = @{'.html'='text/html; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.svg'='image/svg+xml'; '.json'='application/json'; '.png'='image/png'; '.woff2'='font/woff2'}
$csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'none'"
try {
    $listener.Start()
    $port = $listener.LocalEndpoint.Port
    $url = "http://127.0.0.1:$port/"
    Write-Host "Offline workspace: $url"
    Write-Host 'Local mode: sign-in, billing and telemetry are disabled.'
    Write-Host 'Close this window to stop the server.'
    if (-not $NoBrowser) { Start-Process $url }
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $client.ReceiveTimeout = 3000
            $client.SendTimeout = 3000
            $stream = $client.GetStream()
            $header = [Collections.Generic.List[byte]]::new()
            while ($header.Count -lt 16384) {
                $b = $stream.ReadByte()
                if ($b -lt 0) { break }
                $header.Add([byte]$b)
                $n = $header.Count
                if ($n -ge 4 -and $header[$n-4] -eq 13 -and $header[$n-3] -eq 10 -and $header[$n-2] -eq 13 -and $header[$n-1] -eq 10) { break }
            }
            if ($header.Count -eq 0) { continue }
            $request = [Text.Encoding]::ASCII.GetString($header.ToArray())
            $first = ($request -split "`r`n")[0] -split ' '
            $method = $first[0]
            $code = '404 Not Found'
            $type = 'text/plain; charset=utf-8'
            $body = [Text.Encoding]::UTF8.GetBytes('File not present in this HAR capture.')
            if ($method -notin @('GET','HEAD')) {
                $code = '405 Method Not Allowed'
            } elseif ($first.Count -ge 2) {
                $relative = [Uri]::UnescapeDataString(($first[1] -split '\?',2)[0]).TrimStart('/')
                if ($relative -eq '') { $relative = 'index.html' }
                if ($relative -notmatch '[:\\\x00]' -and '..' -notin ($relative -split '/')) {
                    $path = [IO.Path]::GetFullPath((Join-Path $root $relative))
                    if (-not [IO.File]::Exists($path) -and [IO.Path]::GetExtension($relative) -eq '' -and $relative -notmatch '^(api|assets)/') { $path = Join-Path $root 'index.html' }
                    if ($path.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase) -and [IO.File]::Exists($path)) {
                        $code = '200 OK'
                        $body = [IO.File]::ReadAllBytes($path)
                        $ext = [IO.Path]::GetExtension($path)
                        $type = $mime[$ext]
                        if (-not $type) { $type = 'application/octet-stream' }
                    }
                }
            }
            $response = "HTTP/1.1 $code`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nConnection: close`r`nCache-Control: no-store`r`nContent-Security-Policy: $csp`r`nX-Content-Type-Options: nosniff`r`nReferrer-Policy: no-referrer`r`n`r`n"
            $bytes = [Text.Encoding]::ASCII.GetBytes($response)
            $stream.Write($bytes, 0, $bytes.Length)
            if ($method -ne 'HEAD') { $stream.Write($body, 0, $body.Length) }
        } catch {
            Write-Host 'A browser connection was closed or timed out.'
        } finally {
            $client.Close()
        }
    }
} finally {
    $listener.Stop()
}
