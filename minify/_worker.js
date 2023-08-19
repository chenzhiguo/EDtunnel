import{connect as O}from"cloudflare:sockets";var b="d342d11e-d424-4583-b36e-524ab1f0afa4",k=["cdn-all.xn--b6gac.eu.org","cdn.xn--b6gac.eu.org","cdn-b100.xn--b6gac.eu.org","edgetunnel.anycast.eu.org","cdn.anycast.eu.org"],R=k[Math.floor(Math.random()*k.length)],U="https://sky.rethinkdns.com/1:-Pf_____9_8A_AMAIgE8kMABVDDmKOHTAKg=",_="",H="",P="";if(!W(b))throw new Error("uuid is invalid");var q={async fetch(e,t,u){try{b=t.UUID||b,R=t.PROXYIP||R,U=t.DNS_RESOLVER_URL||U,_=t.NODE_ID||_,H=t.API_TOKEN||H,P=t.API_HOST||P;let l=b;b.includes(",")&&(l=b.split(",")[0]);let p=e.headers.get("Upgrade");if(!p||p!=="websocket"){let r=new URL(e.url);switch(r.pathname){case"/cf":return new Response(JSON.stringify(e.cf,null,4),{status:200,headers:{"Content-Type":"application/json;charset=utf-8"}});case"/connect":let[n,a]=["cloudflare.com","80"];console.log(`Connecting to ${n}:${a}...`);try{let i=await O({hostname:n,port:parseInt(a,10)}),h=i.writable.getWriter();try{await h.write(new TextEncoder().encode(`GET / HTTP/1.1\r
Host: `+n+`\r
\r
`))}catch(m){return h.releaseLock(),await i.close(),new Response(m.message,{status:500})}h.releaseLock();let f=i.readable.getReader(),g;try{g=(await f.read()).value}catch(m){return await f.releaseLock(),await i.close(),new Response(m.message,{status:500})}return await f.releaseLock(),await i.close(),new Response(new TextDecoder().decode(g),{status:200})}catch(i){return new Response(i.message,{status:500})}case`/${l}`:{let i=Y(b,e.headers.get("Host"));return new Response(`${i}`,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}case`/sub/${l}`:{let h=new URL(e.url).searchParams,f=J(b,e.headers.get("Host"));return h.get("format")==="clash"&&(f=btoa(f)),new Response(f,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8"}})}case`/subscribe/${l}`:{let h=new URL(e.url).searchParams,f=await X(b,e.headers.get("Host"));return h.get("format")==="clash"&&(f=btoa(f)),new Response(f,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8"}})}default:let s=["www.fmprc.gov.cn","www.xuexi.cn","www.gov.cn","mail.gov.cn","www.mofcom.gov.cn","www.gfbzb.gov.cn","www.miit.gov.cn","www.12377.cn"];r.hostname=s[Math.floor(Math.random()*s.length)],r.protocol="https:";let o=new Headers(e.headers);o.set("cf-connecting-ip",o.get("x-forwarded-for")||o.get("cf-connecting-ip")),o.set("x-forwarded-for",o.get("cf-connecting-ip")),o.set("x-real-ip",o.get("cf-connecting-ip")),o.set("referer","https://www.google.com/q=edtunnel"),e=new Request(r,{method:e.method,headers:o,body:e.body,redirect:e.redirect});let c=caches.default,d=await c.match(e);if(!d){try{d=await fetch(e,{redirect:"manual"})}catch{r.protocol="http:",r.hostname=s[Math.floor(Math.random()*s.length)],e=new Request(r,{method:e.method,headers:o,body:e.body,redirect:e.redirect}),d=await fetch(e,{redirect:"manual"})}let i=d.clone();u.waitUntil(c.put(e,i))}return d}}else return await V(e)}catch(l){let p=l;return new Response(p.toString())}}};async function V(e){let t=new WebSocketPair,[u,l]=Object.values(t);l.accept();let p="",r="",n=(i,h)=>{console.log(`[${p}:${r}] ${i}`,h||"")},a=e.headers.get("sec-websocket-protocol")||"",s=M(l,a,n),o={value:null},c=null,d=!1;return s.pipeTo(new WritableStream({async write(i,h){if(d&&c)return c(i);if(o.value){let T=o.value.writable.getWriter();await T.write(i),T.releaseLock();return}let{hasError:f,message:g,portRemote:m=443,addressRemote:y="",rawDataIndex:$,vlessVersion:v=new Uint8Array([0,0]),isUDP:S}=j(i,b);if(p=y,r=`${m} ${S?"udp":"tcp"} `,f)throw new Error(g);if(S&&m!==53)throw new Error("UDP proxy only enabled for DNS which is port 53");S&&m===53&&(d=!0);let E=new Uint8Array([v[0],0]),x=i.slice($);if(d){let{write:T}=await K(l,E,n);c=T,c(x);return}I(o,y,m,x,l,E,n)},close(){n("readableWebSocketStream is close")},abort(i){n("readableWebSocketStream is abort",JSON.stringify(i))}})).catch(i=>{n("readableWebSocketStream pipeTo error",i)}),new Response(null,{status:101,webSocket:u})}async function I(e,t,u,l,p,r,n){async function a(c,d){let i=O({hostname:c,port:d});e.value=i,n(`connected to ${c}:${d}`);let h=i.writable.getWriter();return await h.write(l),h.releaseLock(),i}async function s(){let c=await a(R||t,u);c.closed.catch(d=>{console.log("retry tcpSocket closed error",d)}).finally(()=>{A(p)}),L(c,p,r,null,n)}let o=await a(t,u);L(o,p,r,s,n)}function M(e,t,u){let l=!1;return new ReadableStream({start(r){e.addEventListener("message",s=>{let o=s.data;r.enqueue(o)}),e.addEventListener("close",()=>{A(e),r.close()}),e.addEventListener("error",s=>{u("webSocketServer has error"),r.error(s)});let{earlyData:n,error:a}=B(t);a?r.error(a):n&&r.enqueue(n)},pull(r){},cancel(r){u(`ReadableStream was canceled, due to ${r}`),l=!0,A(e)}})}function j(e,t){if(e.byteLength<24)return{hasError:!0,message:"invalid data"};let u=new Uint8Array(e.slice(0,1)),l=!1,p=!1,r=new Uint8Array(e.slice(1,17)),n=G(r),a=t.includes(",")?t.split(","):[t];if(console.log(n,a),l=a.some(v=>n===v.trim())||a.length===1&&n===a[0].trim(),console.log(`userID: ${n}`),!l)return{hasError:!0,message:"invalid user"};let s=new Uint8Array(e.slice(17,18))[0],o=new Uint8Array(e.slice(18+s,18+s+1))[0];if(o===1)p=!1;else if(o===2)p=!0;else return{hasError:!0,message:`command ${o} is not support, command 01-tcp,02-udp,03-mux`};let c=18+s+1,d=e.slice(c,c+2),i=new DataView(d).getUint16(0),h=c+2,g=new Uint8Array(e.slice(h,h+1))[0],m=0,y=h+1,$="";switch(g){case 1:m=4,$=new Uint8Array(e.slice(y,y+m)).join(".");break;case 2:m=new Uint8Array(e.slice(y,y+1))[0],y+=1,$=new TextDecoder().decode(e.slice(y,y+m));break;case 3:m=16;let v=new DataView(e.slice(y,y+m)),S=[];for(let E=0;E<8;E++)S.push(v.getUint16(E*2).toString(16));$=S.join(":");break;default:return{hasError:!0,message:`invild  addressType is ${g}`}}return $?{hasError:!1,addressRemote:$,addressType:g,portRemote:i,rawDataIndex:y+m,vlessVersion:u,isUDP:p}:{hasError:!0,message:`addressValue is empty, addressType is ${g}`}}async function L(e,t,u,l,p){let r=0,n=[],a=u,s=!1;await e.readable.pipeTo(new WritableStream({start(){},async write(o,c){s=!0,r++,t.readyState!==D&&c.error("webSocket.readyState is not open, maybe close"),a?(t.send(await new Blob([a,o]).arrayBuffer()),a=null):(console.log(`remoteSocketToWS send chunk ${o.byteLength}`),t.send(o))},close(){p(`remoteConnection!.readable is close with hasIncomingData is ${s}`)},abort(o){console.error("remoteConnection!.readable abort",o)}})).catch(o=>{console.error("remoteSocketToWS has exception ",o.stack||o),A(t)}),s===!1&&l&&(p("retry"),l())}function B(e){if(!e)return{earlyData:null,error:null};try{e=e.replace(/-/g,"+").replace(/_/g,"/");let t=atob(e);return{earlyData:Uint8Array.from(t,l=>l.charCodeAt(0)).buffer,error:null}}catch(t){return{earlyData:null,error:t}}}function W(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}var D=1,z=2;function A(e){try{(e.readyState===D||e.readyState===z)&&e.close()}catch(t){console.error("safeCloseWebSocket error",t)}}var w=[];for(let e=0;e<256;++e)w.push((e+256).toString(16).slice(1));function F(e,t=0){return(w[e[t+0]]+w[e[t+1]]+w[e[t+2]]+w[e[t+3]]+"-"+w[e[t+4]]+w[e[t+5]]+"-"+w[e[t+6]]+w[e[t+7]]+"-"+w[e[t+8]]+w[e[t+9]]+"-"+w[e[t+10]]+w[e[t+11]]+w[e[t+12]]+w[e[t+13]]+w[e[t+14]]+w[e[t+15]]).toLowerCase()}function G(e,t=0){let u=F(e,t);if(!W(u))throw TypeError("Stringified UUID is invalid");return u}async function K(e,t,u){let l=!1,p=new TransformStream({start(n){},transform(n,a){for(let s=0;s<n.byteLength;){let o=n.slice(s,s+2),c=new DataView(o).getUint16(0),d=new Uint8Array(n.slice(s+2,s+2+c));s=s+2+c,a.enqueue(d)}},flush(n){}});p.readable.pipeTo(new WritableStream({async write(n){let s=await(await fetch(U,{method:"POST",headers:{"content-type":"application/dns-message"},body:n})).arrayBuffer(),o=s.byteLength,c=new Uint8Array([o>>8&255,o&255]);e.readyState===D&&(u(`doh success and dns message length is ${o}`),l?e.send(await new Blob([c,s]).arrayBuffer()):(e.send(await new Blob([t,c,s]).arrayBuffer()),l=!0))}})).catch(n=>{u("dns udp has error"+n)});let r=p.writable.getWriter();return{write(n){r.write(n)}}}function Y(e,t){let u=`:443?encryption=none&security=tls&sni=${t}&fp=randomized&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}`,l="---------------------------------------------------------------",p="################################################################",r=e.split(","),n=[],a=[],s=encodeURIComponent(`https://subconverter.do.xn--b6gac.eu.org/sub?target=clash&url=https://${t}/sub/${r[0]}?format=clash&insert=false&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`);return a.push(`
<p align="center"><img src="https://cloudflare-ipfs.com/ipfs/bafybeigd6i5aavwpr6wvnwuyayklq3omonggta4x2q7kpmgafj357nkcky" alt="\u56FE\u7247\u63CF\u8FF0" style="margin-bottom: -50px;">`),a.push(`
<b style=" font-size: 15px;" >Welcome! This function generates configuration for VLESS protocol. If you found this useful, please check our GitHub project for more:</b>
`),a.push(`<b style=" font-size: 15px;" >\u6B22\u8FCE\uFF01\u8FD9\u662F\u751F\u6210 VLESS \u534F\u8BAE\u7684\u914D\u7F6E\u3002\u5982\u679C\u60A8\u53D1\u73B0\u8FD9\u4E2A\u9879\u76EE\u5F88\u597D\u7528\uFF0C\u8BF7\u67E5\u770B\u6211\u4EEC\u7684 GitHub \u9879\u76EE\u7ED9\u6211\u4E00\u4E2Astar\uFF1A</b>
`),a.push(`
<a href="https://github.com/3Kmfi6HP/EDtunnel" target="_blank">EDtunnel - https://github.com/3Kmfi6HP/EDtunnel</a>
`),a.push(`
<iframe src="https://ghbtns.com/github-btn.html?user=USERNAME&repo=REPOSITORY&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>

`.replace(/USERNAME/g,"3Kmfi6HP").replace(/REPOSITORY/g,"EDtunnel")),a.push(`<a href="//${t}/sub/${r[0]}" target="_blank">VLESS \u8282\u70B9\u8BA2\u9605\u8FDE\u63A5</a>
<a href="clash://install-config?url=${s}" target="_blank">Clash \u8282\u70B9\u8BA2\u9605\u8FDE\u63A5</a></p>
`),a.push(""),r.forEach(c=>{let d=`vless://${c}@${t}${u}`,i=`vless://${c}@${R}${u}`;n.push(`UUID: ${c}`),n.push(`${p}
v2ray default ip
${l}
${d}
${l}`),n.push(`${p}
v2ray with best ip
${l}
${i}
${l}`)}),n.push(`${p}
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
	url: https://${t}/sub/${r[0]}?format=clash
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
        <meta property="og:image" content="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(`vless://${e.split(",")[0]}@${t}${u}`)}" />
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
">${a.join("")}</pre><pre>${n.join(`
`)}</pre>
    </body>
</html>`}function J(e,t){let u=[80,8080,8880,2052,2086,2095],l=[443,8443,2053,2096,2087,2083],p=e.includes(",")?e.split(","):[e],r=[];return p.forEach(n=>{t.includes("pages.dev")||u.forEach(a=>{let s=`:${a}?encryption=none&security=none&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTP`,o=`vless://${n}@${t}${s}`;k.forEach(c=>{let d=`vless://${n}@${c}${s}-${c}-EDtunnel`;r.push(`${o}`),r.push(`${d}`)})}),l.forEach(a=>{let s=`:${a}?encryption=none&security=tls&sni=${t}&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTPS`,o=`vless://${n}@${t}${s}`;k.forEach(c=>{let d=`vless://${n}@${c}${s}-${c}-EDtunnel`;r.push(`${o}`),r.push(`${d}`)})})}),r.join(`
`)}async function X(e,t){let u=[],l=[443,2096],p=e.includes(",")?e.split(","):[e],r=await Q(C.url,C),n=k.concat(r),a=[];return p.forEach(c=>{t.includes("pages.dev")||u.forEach(d=>{let i=`:${d}?encryption=none&security=none&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTP`,h=`vless://${c}@${t}${i}`;n.forEach(f=>{let g=`vless://${c}@${f}${i}-${f}-EDtunnel`;a.push(`${h}`),a.push(`${g}`)})}),l.forEach(d=>{let i=`:${d}?encryption=none&security=tls&sni=${t}&fp=random&type=ws&host=${t}&path=%2F%3Fed%3D2048#${t}-HTTPS`,h=`vless://${c}@${t}${i}`;n.forEach(f=>{let g=`vless://${c}@${f}${i}-${f}-EDtunnel`;a.push(`${h}`),a.push(`${g}`)})})}),[...new Set(a)].join(`
`)}var C={url:"https://api.hostmonit.com/get_optimization_ip",method:"POST",headers:{authority:"api.hostmonit.com",accept:"application/json, text/plain, */*","accept-language":"zh-CN,zh;q=0.7","content-type":"application/json",origin:"https://stock.hostmonit.com",referer:"https://stock.hostmonit.com/","sec-ch-ua":'"Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"macOS"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","sec-gpc":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"},data:{key:"iDetkOys"}};async function Q(e,t){let l=await(await fetch(e,{method:t.method,headers:t.headers,body:JSON.stringify(t.data)})).json(),p=[];for(let r of l.info)p.push(r.ip);return p}export{q as default};
//# sourceMappingURL=_worker.js.map
