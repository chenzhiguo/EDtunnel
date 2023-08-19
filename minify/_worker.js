import{connect as O}from"cloudflare:sockets";var b="d342d11e-d424-4583-b36e-524ab1f0afa4",k=["cdn-all.xn--b6gac.eu.org","cdn.xn--b6gac.eu.org","cdn-b100.xn--b6gac.eu.org","edgetunnel.anycast.eu.org","cdn.anycast.eu.org"],R=k[Math.floor(Math.random()*k.length)],U="https://sky.rethinkdns.com/1:-Pf_____9_8A_AMAIgE8kMABVDDmKOHTAKg=",_="",H="",P="";if(!W(b))throw new Error("uuid is invalid");var q={async fetch(e,t,d){try{b=t.UUID||b,R=t.PROXYIP||R,U=t.DNS_RESOLVER_URL||U,_=t.NODE_ID||_,H=t.API_TOKEN||H,P=t.API_HOST||P;let c=b;b.includes(",")&&(c=b.split(",")[0]);let p=e.headers.get("Upgrade");if(!p||p!=="websocket"){let a=new URL(e.url);switch(a.pathname){case"/cf":return new Response(JSON.stringify(e.cf,null,4),{status:200,headers:{"Content-Type":"application/json;charset=utf-8"}});case"/connect":let[n,s]=["cloudflare.com","80"];console.log(`Connecting to ${n}:${s}...`);try{let l=await O({hostname:n,port:parseInt(s,10)}),h=l.writable.getWriter();try{await h.write(new TextEncoder().encode(`GET / HTTP/1.1\r
Host: `+n+`\r
\r
`))}catch(f){return h.releaseLock(),await l.close(),new Response(f.message,{status:500})}h.releaseLock();let m=l.readable.getReader(),g;try{g=(await m.read()).value}catch(f){return await m.releaseLock(),await l.close(),new Response(f.message,{status:500})}return await m.releaseLock(),await l.close(),new Response(new TextDecoder().decode(g),{status:200})}catch(l){return new Response(l.message,{status:500})}case`/${c}`:{let l=Y(b,e.headers.get("Host"));return new Response(`${l}`,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}case`/sub/${c}`:{let h=new URL(e.url).searchParams,m=J(b,e.headers.get("Host"));return h.get("format")==="clash"&&(m=btoa(m)),new Response(m,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8"}})}case`/subscribe/${c}`:{let h=new URL(e.url).searchParams,m=await X(b,e.headers.get("Host"));return h.get("format")==="clash"&&(m=btoa(m)),new Response(m,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8"}})}default:let r=["www.fmprc.gov.cn","www.xuexi.cn","www.gov.cn","mail.gov.cn","www.mofcom.gov.cn","www.gfbzb.gov.cn","www.miit.gov.cn","www.12377.cn"];a.hostname=r[Math.floor(Math.random()*r.length)],a.protocol="https:";let o=new Headers(e.headers);o.set("cf-connecting-ip",o.get("x-forwarded-for")||o.get("cf-connecting-ip")),o.set("x-forwarded-for",o.get("cf-connecting-ip")),o.set("x-real-ip",o.get("cf-connecting-ip")),o.set("referer","https://www.google.com/q=edtunnel"),e=new Request(a,{method:e.method,headers:o,body:e.body,redirect:e.redirect});let i=caches.default,u=await i.match(e);if(!u){try{u=await fetch(e,{redirect:"manual"})}catch{a.protocol="http:",a.hostname=r[Math.floor(Math.random()*r.length)],e=new Request(a,{method:e.method,headers:o,body:e.body,redirect:e.redirect}),u=await fetch(e,{redirect:"manual"})}let l=u.clone();d.waitUntil(i.put(e,l))}return u}}else return await V(e)}catch(c){let p=c;return new Response(p.toString())}}};async function V(e){let t=new WebSocketPair,[d,c]=Object.values(t);c.accept();let p="",a="",n=(l,h)=>{console.log(`[${p}:${a}] ${l}`,h||"")},s=e.headers.get("sec-websocket-protocol")||"",r=M(c,s,n),o={value:null},i=null,u=!1;return r.pipeTo(new WritableStream({async write(l,h){if(u&&i)return i(l);if(o.value){let T=o.value.writable.getWriter();await T.write(l),T.releaseLock();return}let{hasError:m,message:g,portRemote:f=443,addressRemote:y="",rawDataIndex:$,vlessVersion:v=new Uint8Array([0,0]),isUDP:S}=j(l,b);if(p=y,a=`${f} ${S?"udp":"tcp"} `,m)throw new Error(g);if(S&&f!==53)throw new Error("UDP proxy only enabled for DNS which is port 53");S&&f===53&&(u=!0);let E=new Uint8Array([v[0],0]),x=l.slice($);if(u){let{write:T}=await K(c,E,n);i=T,i(x);return}I(o,y,f,x,c,E,n)},close(){n("readableWebSocketStream is close")},abort(l){n("readableWebSocketStream is abort",JSON.stringify(l))}})).catch(l=>{n("readableWebSocketStream pipeTo error",l)}),new Response(null,{status:101,webSocket:d})}async function I(e,t,d,c,p,a,n){async function s(i,u){let l=O({hostname:i,port:u});e.value=l,n(`connected to ${i}:${u}`);let h=l.writable.getWriter();return await h.write(c),h.releaseLock(),l}async function r(){let i=await s(R||t,d);i.closed.catch(u=>{console.log("retry tcpSocket closed error",u)}).finally(()=>{A(p)}),L(i,p,a,null,n)}let o=await s(t,d);L(o,p,a,r,n)}function M(e,t,d){let c=!1;return new ReadableStream({start(a){e.addEventListener("message",r=>{let o=r.data;a.enqueue(o)}),e.addEventListener("close",()=>{A(e),a.close()}),e.addEventListener("error",r=>{d("webSocketServer has error"),a.error(r)});let{earlyData:n,error:s}=B(t);s?a.error(s):n&&a.enqueue(n)},pull(a){},cancel(a){d(`ReadableStream was canceled, due to ${a}`),c=!0,A(e)}})}function j(e,t){if(e.byteLength<24)return{hasError:!0,message:"invalid data"};let d=new Uint8Array(e.slice(0,1)),c=!1,p=!1,a=new Uint8Array(e.slice(1,17)),n=G(a),s=t.includes(",")?t.split(","):[t];if(console.log(n,s),c=s.some(v=>n===v.trim())||s.length===1&&n===s[0].trim(),console.log(`userID: ${n}`),!c)return{hasError:!0,message:"invalid user"};let r=new Uint8Array(e.slice(17,18))[0],o=new Uint8Array(e.slice(18+r,18+r+1))[0];if(o===1)p=!1;else if(o===2)p=!0;else return{hasError:!0,message:`command ${o} is not support, command 01-tcp,02-udp,03-mux`};let i=18+r+1,u=e.slice(i,i+2),l=new DataView(u).getUint16(0),h=i+2,g=new Uint8Array(e.slice(h,h+1))[0],f=0,y=h+1,$="";switch(g){case 1:f=4,$=new Uint8Array(e.slice(y,y+f)).join(".");break;case 2:f=new Uint8Array(e.slice(y,y+1))[0],y+=1,$=new TextDecoder().decode(e.slice(y,y+f));break;case 3:f=16;let v=new DataView(e.slice(y,y+f)),S=[];for(let E=0;E<8;E++)S.push(v.getUint16(E*2).toString(16));$=S.join(":");break;default:return{hasError:!0,message:`invild  addressType is ${g}`}}return $?{hasError:!1,addressRemote:$,addressType:g,portRemote:l,rawDataIndex:y+f,vlessVersion:d,isUDP:p}:{hasError:!0,message:`addressValue is empty, addressType is ${g}`}}async function L(e,t,d,c,p){let a=0,n=[],s=d,r=!1;await e.readable.pipeTo(new WritableStream({start(){},async write(o,i){r=!0,a++,t.readyState!==D&&i.error("webSocket.readyState is not open, maybe close"),s?(t.send(await new Blob([s,o]).arrayBuffer()),s=null):(console.log(`remoteSocketToWS send chunk ${o.byteLength}`),t.send(o))},close(){p(`remoteConnection!.readable is close with hasIncomingData is ${r}`)},abort(o){console.error("remoteConnection!.readable abort",o)}})).catch(o=>{console.error("remoteSocketToWS has exception ",o.stack||o),A(t)}),r===!1&&c&&(p("retry"),c())}function B(e){if(!e)return{earlyData:null,error:null};try{e=e.replace(/-/g,"+").replace(/_/g,"/");let t=atob(e);return{earlyData:Uint8Array.from(t,c=>c.charCodeAt(0)).buffer,error:null}}catch(t){return{earlyData:null,error:t}}}function W(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}var D=1,z=2;function A(e){try{(e.readyState===D||e.readyState===z)&&e.close()}catch(t){console.error("safeCloseWebSocket error",t)}}var w=[];for(let e=0;e<256;++e)w.push((e+256).toString(16).slice(1));function F(e,t=0){return(w[e[t+0]]+w[e[t+1]]+w[e[t+2]]+w[e[t+3]]+"-"+w[e[t+4]]+w[e[t+5]]+"-"+w[e[t+6]]+w[e[t+7]]+"-"+w[e[t+8]]+w[e[t+9]]+"-"+w[e[t+10]]+w[e[t+11]]+w[e[t+12]]+w[e[t+13]]+w[e[t+14]]+w[e[t+15]]).toLowerCase()}function G(e,t=0){let d=F(e,t);if(!W(d))throw TypeError("Stringified UUID is invalid");return d}async function K(e,t,d){let c=!1,p=new TransformStream({start(n){},transform(n,s){for(let r=0;r<n.byteLength;){let o=n.slice(r,r+2),i=new DataView(o).getUint16(0),u=new Uint8Array(n.slice(r+2,r+2+i));r=r+2+i,s.enqueue(u)}},flush(n){}});p.readable.pipeTo(new WritableStream({async write(n){let r=await(await fetch(U,{method:"POST",headers:{"content-type":"application/dns-message"},body:n})).arrayBuffer(),o=r.byteLength,i=new Uint8Array([o>>8&255,o&255]);e.readyState===D&&(d(`doh success and dns message length is ${o}`),c?e.send(await new Blob([i,r]).arrayBuffer()):(e.send(await new Blob([t,i,r]).arrayBuffer()),c=!0))}})).catch(n=>{d("dns udp has error"+n)});let a=p.writable.getWriter();return{write(n){a.write(n)}}}function Y(e,t){let d=`:443?encryption=none&security=tls&sni=${t}&fp=randomized&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}`,c="---------------------------------------------------------------",p="################################################################",a=e.split(","),n=[],s=[],r=encodeURIComponent(`https://subconverter.do.xn--b6gac.eu.org/sub?target=clash&url=https://${t}/sub/${a[0]}?format=clash&insert=false&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`);return s.push(`
<p align="center"><img src="https://cloudflare-ipfs.com/ipfs/bafybeigd6i5aavwpr6wvnwuyayklq3omonggta4x2q7kpmgafj357nkcky" alt="\u56FE\u7247\u63CF\u8FF0" style="margin-bottom: -50px;">`),s.push(`
<b style=" font-size: 15px;" >Welcome! This function generates configuration for VLESS protocol. If you found this useful, please check our GitHub project for more:</b>
`),s.push(`<b style=" font-size: 15px;" >\u6B22\u8FCE\uFF01\u8FD9\u662F\u751F\u6210 VLESS \u534F\u8BAE\u7684\u914D\u7F6E\u3002\u5982\u679C\u60A8\u53D1\u73B0\u8FD9\u4E2A\u9879\u76EE\u5F88\u597D\u7528\uFF0C\u8BF7\u67E5\u770B\u6211\u4EEC\u7684 GitHub \u9879\u76EE\u7ED9\u6211\u4E00\u4E2Astar\uFF1A</b>
`),s.push(`
<a href="https://github.com/3Kmfi6HP/EDtunnel" target="_blank">EDtunnel - https://github.com/3Kmfi6HP/EDtunnel</a>
`),s.push(`
<iframe src="https://ghbtns.com/github-btn.html?user=USERNAME&repo=REPOSITORY&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>

`.replace(/USERNAME/g,"3Kmfi6HP").replace(/REPOSITORY/g,"EDtunnel")),s.push(`<a href="//${t}/sub/${a[0]}" target="_blank">VLESS \u8282\u70B9\u8BA2\u9605\u8FDE\u63A5</a>
<a href="clash://install-config?url=${r}" target="_blank">Clash \u8282\u70B9\u8BA2\u9605\u8FDE\u63A5</a></p>
`),s.push(""),a.forEach(i=>{let u=`vless://${i}@${t}${d}`,l=`vless://${i}@${R}${d}`;n.push(`UUID: ${i}`),n.push(`${p}
v2ray default ip
${c}
${u}
${c}`),n.push(`${p}
v2ray with best ip
${c}
${l}
${c}`)}),n.push(`${p}
# Clash Proxy Provider \u914D\u7F6E\u683C\u5F0F(configuration format)
proxy-groups:
  - name: UseProvider
	type: select
	use:
	  - provider1
	proxies:
	  - Proxy
	  - DIRECT
proxy-providers:
  provider1:
	type: http
	url: https://${t}/sub/${a[0]}?format=clash
	interval: 3600
	path: ./provider1.yaml
	health-check:
	  enable: true
	  interval: 600
	  # lazy: true
	  url: http://www.gstatic.com/generate_204

${p}`),`
    <html>
    ${`
    <head>
        <title>EDtunnel: VLESS configuration</title>
        <meta name="description" content="This is a tool for generating VLESS protocol configurations. Give us a star on GitHub https://github.com/3Kmfi6HP/EDtunnel if you found it useful!">
		<meta name="keywords" content="EDtunnel, cloudflare pages, cloudflare worker, severless">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<meta property="og:site_name" content="EDtunnel: VLESS configuration" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EDtunnel - VLESS configuration and subscribe output" />
        <meta property="og:description" content="Use cloudflare pages and worker severless to implement vless protocol" />
        <meta property="og:url" content="https://${t}/" />
        <meta property="og:image" content="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(`vless://${e.split(",")[0]}@${t}${d}`)}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EDtunnel - VLESS configuration and subscribe output" />
        <meta name="twitter:description" content="Use cloudflare pages and worker severless to implement vless protocol" />
        <meta name="twitter:url" content="https://${t}/" />
        <meta name="twitter:image" content="https://cloudflare-ipfs.com/ipfs/bafybeigd6i5aavwpr6wvnwuyayklq3omonggta4x2q7kpmgafj357nkcky" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="1500" />

        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            padding: 10px;
        }

        a {
            color: #1a0dab;
            text-decoration: none;
        }
		img {
			max-width: 100%;
			height: auto;
		}
		
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
        }
		/* Dark mode */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #333;
                color: #f0f0f0;
            }

            a {
                color: #9db4ff;
            }

            pre {
                background-color: #282a36;
                border-color: #6272a4;
            }
        }
        </style>
    </head>
    `}
    <body>
    <pre style="
    background-color: transparent;
    border: none;
">${s.join("")}</pre><pre>${n.join(`
`)}</pre>
    </body>
</html>`}function J(e,t){let d=[80,8080,8880,2052,2086,2095],c=[443,8443,2053,2096,2087,2083],p=e.includes(",")?e.split(","):[e],a=[];return p.forEach(n=>{t.includes("pages.dev")||d.forEach(s=>{let r=`:${s}?encryption=none&security=none&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTP`,o=`vless://${n}@${t}${r}`;k.forEach(i=>{let u=`vless://${n}@${i}${r}-${i}-EDtunnel`;a.push(`${o}`),a.push(`${u}`)})}),c.forEach(s=>{let r=`:${s}?encryption=none&security=tls&sni=${t}&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTPS`,o=`vless://${n}@${t}${r}`;k.forEach(i=>{let u=`vless://${n}@${i}${r}-${i}-EDtunnel`;a.push(`${o}`),a.push(`${u}`)})})}),a.join(`
`)}async function X(e,t){let d=[],c=[443,2096],p=e.includes(",")?e.split(","):[e],a=await Q(C.url,C),n=[];for(let u of a.info)n.push(u.ip);let s=k.concat(n);console.log(n);let r=[];return p.forEach(u=>{t.includes("pages.dev")||d.forEach(l=>{let h=`:${l}?encryption=none&security=none&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTP`,m=`vless://${u}@${t}${h}`;s.forEach(g=>{let f=`vless://${u}@${g}${h}-${g}-EDtunnel`;r.push(`${m}`),r.push(`${f}`)})}),c.forEach(l=>{let h=`:${l}?encryption=none&security=tls&sni=${t}&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTPS`,m=`vless://${u}@${t}${h}`;s.forEach(g=>{let f=`vless://${u}@${g}${h}-${g}-EDtunnel`;r.push(`${m}`),r.push(`${f}`)})})}),[...new Set(r)].join(`
`)}var C={url:"https://api.hostmonit.com/get_optimization_ip",method:"POST",headers:{authority:"api.hostmonit.com",accept:"application/json, text/plain, */*","accept-language":"zh-CN,zh;q=0.7","content-type":"application/json",origin:"https://stock.hostmonit.com",referer:"https://stock.hostmonit.com/","sec-ch-ua":'"Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"macOS"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","sec-gpc":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"},data:{key:"iDetkOys"}};async function Q(e,t){return await(await fetch(e,{method:t.method,headers:t.headers,body:JSON.stringify(t.data)})).json()}export{q as default};
//# sourceMappingURL=_worker.js.map
