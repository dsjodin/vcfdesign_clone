import{aF as Q}from"./index-BRyLftWV.js";import"./vendor-reactflow-cahzmn3Z.js";import"./vendor-icons-BwMMO_rC.js";import"./vendor-cjs-helpers-CRNIONdy.js";const U="N/A";function w(r){return r==null||r===""?U:String(r)}function H(r){return w(r==null?void 0:r.vlanId)}function o(r){return r.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const X={"sddc-manager":"rounded=1;fillColor=#1B3A50;fontColor=#ffffff;strokeColor=#4DB8FF;strokeWidth=2;arcSize=10;shadow=1;",vcenter:"rounded=1;fillColor=#1A237E;fontColor=#ffffff;strokeColor=#7986CB;strokeWidth=2;arcSize=10;shadow=1;","nsx-manager":"rounded=1;fillColor=#1B5E20;fontColor=#ffffff;strokeColor=#66BB6A;strokeWidth=2;arcSize=10;shadow=1;","nsx-edge":"rounded=1;fillColor=#2E7D32;fontColor=#ffffff;strokeColor=#81C784;strokeWidth=2;arcSize=10;shadow=1;",vsan:"rounded=1;fillColor=#4A148C;fontColor=#ffffff;strokeColor=#AB47BC;strokeWidth=2;arcSize=10;shadow=1;","fc-storage":"rounded=1;fillColor=#880E4F;fontColor=#ffffff;strokeColor=#EC407A;strokeWidth=2;arcSize=10;shadow=1;","nfs-storage":"rounded=1;fillColor=#E65100;fontColor=#ffffff;strokeColor=#FF9800;strokeWidth=2;arcSize=10;shadow=1;","avi-controller":"rounded=1;fillColor=#BF360C;fontColor=#ffffff;strokeColor=#FF7043;strokeWidth=2;arcSize=10;shadow=1;","avi-se":"rounded=1;fillColor=#E65100;fontColor=#ffffff;strokeColor=#FFA726;strokeWidth=2;arcSize=10;shadow=1;","esxi-host":"rounded=1;fillColor=#263238;fontColor=#ffffff;strokeColor=#78909C;strokeWidth=2;arcSize=10;shadow=1;","vcf-automation":"rounded=1;fillColor=#311B92;fontColor=#ffffff;strokeColor=#9575CD;strokeWidth=2;arcSize=10;shadow=1;","vcf-operations":"rounded=1;fillColor=#BF360C;fontColor=#ffffff;strokeColor=#FF7043;strokeWidth=2;arcSize=10;shadow=1;","fleet-manager":"rounded=1;fillColor=#006064;fontColor=#ffffff;strokeColor=#00ACC1;strokeWidth=2;arcSize=10;shadow=1;","vcf-instance":"rounded=1;fillColor=#0277BD;fontColor=#ffffff;strokeColor=#29B6F6;strokeWidth=2;arcSize=10;shadow=1;",networkLine:"rounded=1;fillColor=#37474F;fontColor=#ffffff;strokeColor=#607D8B;strokeWidth=1;arcSize=4;",container:"rounded=1;fillColor=none;dashed=1;dashPattern=8 4;strokeColor=#90A4AE;fontColor=#546E7A;strokeWidth=2;verticalAlign=top;fontSize=13;fontStyle=1;","management-domain":"rounded=1;fillColor=#E3F2FD;dashed=1;dashPattern=8 4;strokeColor=#1565C0;fontColor=#1565C0;strokeWidth=2;verticalAlign=top;fontSize=13;fontStyle=1;opacity=50;",storage:"rounded=1;fillColor=#F3E5F5;dashed=1;dashPattern=8 4;strokeColor=#7B1FA2;fontColor=#7B1FA2;strokeWidth=2;verticalAlign=top;fontSize=13;fontStyle=1;opacity=50;",cluster:"rounded=1;fillColor=#ECEFF1;dashed=1;dashPattern=8 4;strokeColor=#546E7A;fontColor=#546E7A;strokeWidth=2;verticalAlign=top;fontSize=12;fontStyle=1;opacity=50;","workload-domain":"rounded=1;fillColor=#E0F2F1;dashed=1;dashPattern=8 4;strokeColor=#00695C;fontColor=#00695C;strokeWidth=2;verticalAlign=top;fontSize=13;fontStyle=1;opacity=50;",stretchedCluster:"rounded=1;fillColor=#FFF8E1;dashed=1;dashPattern=8 4;strokeColor=#F57F17;fontColor=#F57F17;strokeWidth=2;verticalAlign=top;fontSize=13;fontStyle=1;opacity=50;",availabilityZone:"rounded=1;fillColor=#E0F7FA;fontColor=#006064;strokeColor=#00838F;strokeWidth=2;arcSize=10;dashed=1;dashPattern=5 3;"},ee="rounded=1;fillColor=#1e293b;fontColor=#ffffff;strokeColor=#475569;arcSize=8;";function te(r,F){return X[r]||X[F]||ee}function j(r,F){if(typeof window>"u"||typeof document>"u")throw new Error("draw.io export requires a browser download environment.");const W=new Blob([r],{type:"application/octet-stream"});try{Q.saveAs(W,F)}catch(c){const h=c instanceof Error?c.message:"Unknown download error";throw new Error(`draw.io export failed: ${h}`)}}function oe(r){var f,C,s,u,m,y,A,g,T,v,G;const F=[];let W=2;const c=(i,a,x,b,O,I,P="1")=>{const Y=W++;return F.push(`<mxCell id="${Y}" value="${o(i)}" style="${I}" vertex="1" parent="${P}"><mxGeometry x="${a}" y="${x}" width="${b}" height="${O}" as="geometry"/></mxCell>`),Y};let h=40;const M="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=14;fontStyle=1;verticalAlign=top;",V=r.managementDomain.clusters??[],B=280+(V.length>2?100:0);c("Management Domain",40,h,700,B,M);let L=60;const E=h+40;for(const i of V){const a="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;verticalAlign=top;",x=`${w(i.name)}
${w(i.hostCount)} hosts
${w((f=i.hostSpec)==null?void 0:f.cpuSockets)}x${w((C=i.hostSpec)==null?void 0:C.coresPerSocket)} cores
${w((s=i.hostSpec)==null?void 0:s.ramGB)} GB RAM`;c(x,L,E,200,140,a),L+=220}const $=r.managementDomain.storageType,R=$!=null&&$.type?$.type.toUpperCase():U,N="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;",t=`Storage
${R}
${w($==null?void 0:$.capacityTB)} TB
FTT: ${w($==null?void 0:$.ftt)}`;c(t,60,E+160,140,90,N);const p=r.networkConfig,e="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;",n=`Networks
Mgmt VLAN ${H(p==null?void 0:p.management)}
vMotion VLAN ${H(p==null?void 0:p.vmotion)}
vSAN VLAN ${H(p==null?void 0:p.vsan)}
NSX VLAN ${H(p==null?void 0:p.nsxOverlay)}`;c(n,220,E+160,180,90,e);const d=(u=r.managementVMRequirements)==null?void 0:u.nsxEdges;if(d&&d.instanceCount>0){const i="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;",a=`NSX Edges
${d.instanceCount} nodes
${d.formFactor}`;c(a,420,E+160,160,90,i)}h+=B+60;for(const i of r.workloadDomains??[]){const a=i.clusters??[],x="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;fontStyle=1;verticalAlign=top;",b=180+(a.length>2?80:0);c(`Workload Domain: ${w(i.name)}`,40,h,700,b,x);let O=60;const I=h+40;for(const k of a){const z="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=10;",D=`${w(k.name)}
${w(k.hostCount)} hosts
${w((m=k.hostSpec)==null?void 0:m.cpuSockets)}x${w((y=k.hostSpec)==null?void 0:y.coresPerSocket)} cores`;c(D,O,I,180,100,z),O+=200}const P=[...new Set(a.map(k=>{var z,D;return(((z=k.storageType)==null?void 0:z.type)??((D=i.storageType)==null?void 0:D.type)??U).toUpperCase()}))],Y=P.length>1?P.join(" / "):P[0]??((A=i.storageType)!=null&&A.type?i.storageType.type.toUpperCase():U),J=a.length>0?a.reduce((k,z)=>{var D,q;return k+(((D=z.storageType)==null?void 0:D.capacityTB)??((q=i.storageType)==null?void 0:q.capacityTB)??0)},0):((g=i.storageType)==null?void 0:g.capacityTB)??0,K=`Storage
${Y}
${J} TB`;c(K,60,I+120,140,70,N);const _=(i.workloads??[]).reduce((k,z)=>k+z.vmCount,0);if(_>0){const k="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=10;",z=`Workloads
${_} VMs`;c(z,220,I+120,120,70,k)}h+=b+40}if((T=r.fleetConfig)!=null&&T.enabled&&((G=(v=r.fleetConfig)==null?void 0:v.vcfInstances)==null?void 0:G.length)>0){const i="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontSize=11;fontStyle=2;verticalAlign=middle;align=center;dashed=1;dashPattern=5 5;",a=`Fleet Mode: ${r.fleetConfig.vcfInstances.length+1} VCF Instances
(This diagram shows primary instance only)`;c(a,40,h,700,60,i),h+=80}const l="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontSize=9;fontColor=#666666;",S=`Design: ${r.name}
VCF Version: ${w(r.version)}
Generated: ${new Date().toLocaleDateString()}`;return c(S,40,h,400,60,l),`<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="VCFDesigner" modified="${new Date().toISOString()}" agent="VCFDesigner" version="1.0" type="device">
  <diagram id="vcf-architecture" name="VCF Architecture - ${o(r.name)}">
    <mxGraphModel dx="1200" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="${Math.max(1100,h+100)}" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${F.join(`
        `)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`}function Z(r){return`${r.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"vcf-design"}-architecture.drawio`}function se(r){j(oe(r),Z(r.name))}function re(r,F){const W=new Set(["container","stretchedCluster","availabilityZone"]),c=e=>W.has(e.type||""),h=r.map(e=>{var s,u,m,y,A,g,T,v;const n=((s=e.style)==null?void 0:s.width)||((u=e.measured)==null?void 0:u.width)||e.width||180,d=((m=e.style)==null?void 0:m.height)||((y=e.measured)==null?void 0:y.height)||e.height||60,l=((A=e.data)==null?void 0:A.label)||((g=e.data)==null?void 0:g.clusterName)||e.id,S=((T=e.data)==null?void 0:T.type)||"",f=e.type||"",C=c(e)?X[S]||X[f]||X.container:te(S,f);return{id:e.id,label:l,x:e.position.x,y:e.position.y,width:n,height:d,style:C,isContainer:c(e),nodeType:f,dataType:S,instanceCount:((v=e.data)==null?void 0:v.instanceCount)||1}}),M=h.filter(e=>e.isContainer).toSorted((e,n)=>n.width*n.height-e.width*e.height),V=h.filter(e=>!e.isContainer),B=new Map;for(const e of V){let n=null,d=1/0;for(const l of M)if(e.x>=l.x&&e.y>=l.y&&e.x+e.width<=l.x+l.width&&e.y+e.height<=l.y+l.height){const f=l.width*l.height;f<d&&(d=f,n=l)}n&&B.set(e.id,{parent:n.id,relX:e.x-n.x,relY:e.y-n.y})}for(const e of M){let n=null,d=1/0;for(const l of M){if(l.id===e.id)continue;if(e.x>=l.x&&e.y>=l.y&&e.x+e.width<=l.x+l.width&&e.y+e.height<=l.y+l.height){const f=l.width*l.height;f>e.width*e.height&&f<d&&(d=f,n=l)}}n&&B.set(e.id,{parent:n.id,relX:e.x-n.x,relY:e.y-n.y})}let L=0,E=0;for(const e of h)L=Math.max(L,e.x+e.width+50),E=Math.max(E,e.y+e.height+50);const $=Math.max(1600,Math.ceil(L/100)*100),R=Math.max(1200,Math.ceil(E/100)*100),N=F.map(e=>({id:e.id,source:e.source,target:e.target,label:e.label,style:"edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748b;fontColor=#94a3b8;"}));let t=`<?xml version="1.0" encoding="UTF-8"?>
`;t+=`<mxfile host="app.diagrams.net">
`,t+=`  <diagram name="VCF Architecture">
`,t+=`    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${$}" pageHeight="${R}">
`,t+=`      <root>
`,t+=`        <mxCell id="0"/>
`,t+=`        <mxCell id="1" parent="0"/>
`;for(const e of M){const n=B.get(e.id),d=(n==null?void 0:n.parent)||"1",l=n?n.relX:e.x,S=n?n.relY:e.y,f=(e.style||"")+"container=1;collapsible=0;";if(t+=`        <mxCell id="${o(e.id)}" value="${o(e.label)}" style="${o(f)}" vertex="1" parent="${o(d)}">
`,t+=`          <mxGeometry x="${l}" y="${S}" width="${e.width}" height="${e.height}" as="geometry"/>
`,t+=`        </mxCell>
`,e.nodeType==="stretchedCluster"){const C=r.find(s=>s.id===e.id);if(C!=null&&C.data){const s=C.data,u=s.preferredSite,m=s.secondarySite,y=s.witness,A=s.latency,g=20,T=40,v=Math.floor((e.width-g*4)/3),G=e.height-T-g*2,i=T+g;if(u){const a=`Preferred Site
${u.name||"Site A"}${u.location?`
Location: `+u.location:""}
${u.hostCount||0} Hosts`;t+=`        <mxCell id="${o(e.id+"-pref-site")}" value="${o(a)}" style="${o("rounded=1;fillColor=#E8F5E9;strokeColor=#2E7D32;fontColor=#1B5E20;strokeWidth=2;arcSize=8;whiteSpace=wrap;align=left;verticalAlign=top;spacingTop=8;spacingLeft=8;fontSize=11;")}" vertex="1" parent="${o(e.id)}">
`,t+=`          <mxGeometry x="${g}" y="${i}" width="${v}" height="${G}" as="geometry"/>
`,t+=`        </mxCell>
`}if(m){const a=`Secondary Site
${m.name||"Site B"}${m.location?`
Location: `+m.location:""}
${m.hostCount||0} Hosts`,x="rounded=1;fillColor=#E3F2FD;strokeColor=#1565C0;fontColor=#0D47A1;strokeWidth=2;arcSize=8;whiteSpace=wrap;align=left;verticalAlign=top;spacingTop=8;spacingLeft=8;fontSize=11;",b=g*2+v;t+=`        <mxCell id="${o(e.id+"-sec-site")}" value="${o(a)}" style="${o(x)}" vertex="1" parent="${o(e.id)}">
`,t+=`          <mxGeometry x="${b}" y="${i}" width="${v}" height="${G}" as="geometry"/>
`,t+=`        </mxCell>
`}if(y){const a=`Witness
${y.hostname||"vcf-witness-01"}${y.location?`
Location: `+y.location:""}
${y.formFactor||"Medium"}
${y.vcpu||2} vCPU / ${y.memoryGB||16} GB`,x="rounded=1;fillColor=#FFF3E0;strokeColor=#E65100;fontColor=#BF360C;strokeWidth=2;arcSize=8;whiteSpace=wrap;align=left;verticalAlign=top;spacingTop=8;spacingLeft=8;fontSize=11;",b=g*3+v*2;t+=`        <mxCell id="${o(e.id+"-witness")}" value="${o(a)}" style="${o(x)}" vertex="1" parent="${o(e.id)}">
`,t+=`          <mxGeometry x="${b}" y="${i}" width="${v}" height="${G}" as="geometry"/>
`,t+=`        </mxCell>
`}if(A){const a=`Site-to-Site: ≤${A.maxDataSiteLatencyMs||5}ms RTT    Witness: ≤${A.maxWitnessLatencyMs||200}ms RTT    ${A.minBandwidthGbps||10} Gbps min bandwidth`,x="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontColor=#F57F17;fontSize=10;fontStyle=2;",b=e.width-g*2;t+=`        <mxCell id="${o(e.id+"-latency")}" value="${o(a)}" style="${o(x)}" vertex="1" parent="${o(e.id)}">
`,t+=`          <mxGeometry x="${g}" y="${T}" width="${b}" height="20" as="geometry"/>
`,t+=`        </mxCell>
`}}}}const p=8;for(const e of V){const n=B.get(e.id),d=(n==null?void 0:n.parent)||"1",l=n?n.relX:e.x,S=n?n.relY:e.y,f=e.instanceCount,C=Math.min(f,4);if(C>1)for(let s=C-1;s>=1;s--){const u=Math.round(30+25*(C-s-1)/Math.max(C-1,1)),m=(e.style||"").replace(/opacity=\d+/,`opacity=${u}`),y=m.includes("opacity=")?m:`${m}opacity=${u};`;t+=`        <mxCell id="${o(e.id+"-cascade-"+s)}" value="" style="${o(y)}" vertex="1" parent="${o(d)}">
`,t+=`          <mxGeometry x="${l+s*p}" y="${S+s*p}" width="${e.width}" height="${e.height}" as="geometry"/>
`,t+=`        </mxCell>
`}t+=`        <mxCell id="${o(e.id)}" value="${o(e.label)}" style="${o(e.style||"")}" vertex="1" parent="${o(d)}">
`,t+=`          <mxGeometry x="${l}" y="${S}" width="${e.width}" height="${e.height}" as="geometry"/>
`,t+=`        </mxCell>
`,C>1&&(t+=`        <mxCell id="${o(e.id+"-badge")}" value="${f}" style="${o("ellipse;whiteSpace=wrap;html=1;fillColor=#263238;strokeColor=#546E7A;fontColor=#FFFFFF;fontSize=10;fontStyle=1;")}" vertex="1" parent="${o(d)}">
`,t+=`          <mxGeometry x="${l-8}" y="${S-8}" width="20" height="20" as="geometry"/>
`,t+=`        </mxCell>
`)}for(const e of N){const n=e.label?` value="${o(e.label)}"`:"";t+=`        <mxCell id="${o(e.id)}"${n} style="${o(e.style||"")}" edge="1" parent="1" source="${o(e.source)}" target="${o(e.target)}">
`,t+=`          <mxGeometry relative="1" as="geometry"/>
`,t+=`        </mxCell>
`}return t+=`      </root>
`,t+=`    </mxGraphModel>
`,t+=`  </diagram>
`,t+="</mxfile>",t}function ce(r,F,W){const c=re(r,F);j(c,Z(W))}export{re as convertToDrawioXml,se as downloadDrawIOFile,o as escapeXml,oe as exportToDrawIO,ce as exportToDrawio};
