import{D as e,M as t,O as n,S as r,h as i,j as a,n as o,p as s,r as c,s as l,t as u,x as d}from"./three.module.DmhOvf5d.js";import{t as f}from"./Earcut.C-bCWNHB.js";var p={Uint8Array,Uint16Array,Int16Array,Int32Array,Float32Array};async function m(e){let t=await fetch(e);if(!t.ok)throw Error(`town data `+t.status);let n=await t.arrayBuffer(),r=new Uint8Array(n,0,2);r[0]===31&&r[1]===139&&(n=await new Response(new Blob([n]).stream().pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer());let i=new DataView(n).getUint32(4,!0),a=JSON.parse(new TextDecoder().decode(new Uint8Array(n,8,i))),o=8+i;return{header:a,get:e=>{let t=a.sections[e];return new p[t.type](n,o+t.offset,t.count)}}}var h=new l(`#fbf8f1`),ee=1.5,g=1.35,_=`
uniform float uWave;      // 0..1 progress of the growth wave
uniform float uSpan;      // metres over which a building grows
uniform float uReach;     // metres the wave travels
float growth(float dist, float lead) {
  float k = (uWave * (uReach + uSpan) - dist - lead) / uSpan;
  k = clamp(k, 0.0, 1.0);
  return 1.0 - pow(1.0 - k, 3.0);
}`,v=`
uniform vec4 uFade; // centre x, centre z, half extent x, half extent z
uniform vec3 uPaper;
float edgeFade(vec3 w) {
  vec2 q = (w.xz - uFade.xy) / uFade.zw;
  return smoothstep(0.62, 0.98, length(q));
}`;function te(e){let t={uniforms:e},r=new n({...t,side:2,vertexShader:`
      attribute vec3 aInfo; // dist from anchor, base elevation, t (0 foot .. 1 roof)
      varying vec3 vW; varying float vT; varying float vG;
      ${_}
      void main() {
        float g = growth(aInfo.x, 0.0);
        vec3 p = position; p.y = mix(aInfo.y, position.y, g);
        vG = g; vT = aInfo.z; vW = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,fragmentShader:`
      varying vec3 vW; varying float vT; varying float vG;
      uniform vec3 uSun;
      ${v}
      void main() {
        if (vG <= 0.001) discard;
        vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
        if (n.y < 0.0) n = -n;
        float roof = smoothstep(0.85, 0.97, n.y);
        float l = clamp(dot(n, normalize(uSun)), 0.0, 1.0);
        vec3 roofC = vec3(1.0, 0.992, 0.972);
        vec3 wallLit = vec3(0.925, 0.905, 0.855);
        vec3 wallDark = vec3(0.72, 0.69, 0.63);
        vec3 wall = mix(wallDark, wallLit, l);
        wall *= 0.80 + 0.20 * smoothstep(0.0, 0.7, vT); // soft ambient occlusion toward the foot
        vec3 c = mix(wall, roofC, roof);
        c = mix(c, uPaper, edgeFade(vW));
        gl_FragColor = vec4(c, 1.0);
      }`}),i=new n({...t,transparent:!0,depthWrite:!1,vertexShader:`
      attribute vec3 aInfo; varying vec3 vW; varying float vG;
      ${_}
      void main() {
        float g = growth(aInfo.x, 0.0);
        vec3 p = position; p.y = mix(aInfo.y, position.y, g) + 0.15; vG = g; vW = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,fragmentShader:`
      varying vec3 vW; varying float vG;
      ${v}
      void main() {
        if (vG <= 0.001) discard;
        gl_FragColor = vec4(vec3(0.118, 0.102, 0.082), 0.5 * (1.0 - edgeFade(vW)));
      }`}),a=t=>new n({uniforms:{...e,uAlpha:{value:t}},transparent:!0,depthWrite:!1,vertexShader:`
      attribute float aDist; varying vec3 vW; varying float vG;
      ${_}
      void main() { vG = growth(aDist, -500.0); vW = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      varying vec3 vW; varying float vG; uniform float uAlpha;
      ${v}
      void main() { gl_FragColor = vec4(vec3(0.118, 0.102, 0.082), uAlpha * vG * (1.0 - edgeFade(vW))); }`}),o=new n({...t,vertexShader:`
      attribute float aMask; attribute vec3 aNormal; varying vec3 vW; varying float vM; varying vec3 vN;
      void main() { vW = position; vM = aMask; vN = aNormal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      varying vec3 vW; varying float vM; varying vec3 vN; uniform vec3 uSun; uniform float uVex;
      ${v}
      float contour(float h, float step, float w) {
        float f = abs(fract(h / step - 0.5) - 0.5) * step; // metres to nearest contour
        float fw = fwidth(h);
        return 1.0 - smoothstep(0.0, fw * w, f);
      }
      void main() {
        vec3 n = normalize(vN);
        float l = clamp(dot(n, normalize(uSun)), 0.0, 1.0);
        vec3 lit = vec3(0.992, 0.978, 0.945), shade = vec3(0.885, 0.858, 0.79);
        vec3 c = mix(shade, lit, smoothstep(0.15, 0.85, l));
        c = mix(c, c * vec3(0.975, 0.97, 0.945), vM); // park / forest: a slightly deeper paper
        float h = vW.y / uVex;
        float c20 = contour(h, 20.0, 0.9) * 0.07 + contour(h, 100.0, 1.2) * 0.12;
        c = mix(c, vec3(0.118, 0.102, 0.082), c20);
        c = mix(c, uPaper, edgeFade(vW));
        gl_FragColor = vec4(c, 1.0);
      }`}),s=new n({...t,side:2,vertexShader:`
      attribute float aDist; varying vec3 vW; varying float vD;
      void main() { vD = aDist; vW = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      varying vec3 vW; varying float vD; uniform float uRiver;
      ${v}
      void main() {
        if (vD > uRiver) discard;
        vec3 c = mix(vec3(0.22, 0.325, 0.643), uPaper, edgeFade(vW));
        gl_FragColor = vec4(c, 1.0);
      }`});return{buildings:r,outline:i,roadMajor:a(.5),roadMinor:a(.22),terrain:o,water:s}}function y(e,t,n,r,i,a,s){let l=[],u=[];for(let i=0;i<=40;i++){let a=(n+(r-n)*i/40)*Math.PI/180;if(l.push((e*Math.cos(a)-0)*s,e*Math.sin(a)*s,0,t*Math.cos(a)*s,t*Math.sin(a)*s,0),i){let e=(i-1)*2;u.push(e,e+1,e+2,e+1,e+3,e+2)}}let d=new c;return d.setAttribute(`position`,new o(new Float32Array(l),3)),d.setIndex(u),d}async function b(p){let{header:_,get:v}=await m(`/geo/town/town-${p.lod}.bin`),{nx:b,ny:x,step:S,elevMin:ne,elevMax:re}=_.grid,{xmin:ie,ymax:ae}=_.extent,oe=v(`terrain`),se=v(`landmask`),C=e=>ne+oe[e]/65535*(re-ne),w=e=>(e-430)*g,T=(e,t)=>{let n=Math.max(0,Math.min(b-1.0001,(e-ie)/S)),r=Math.max(0,Math.min(x-1.0001,(ae-t)/S)),i=Math.floor(n),a=Math.floor(r),o=n-i,s=r-a,c=C(a*b+i)*(1-o)*(1-s)+C(a*b+i+1)*o*(1-s)+C((a+1)*b+i)*(1-o)*s+C((a+1)*b+i+1)*o*s;return w(c)},E={uWave:{value:0},uSpan:{value:650},uReach:{value:4200},uRiver:{value:0},uVex:{value:g},uSun:{value:new a(-.55,.78,.5)},uPaper:{value:new a(h.r,h.g,h.b)},uFade:{value:new t(0,0,1,1)}},D=_.extent,O={x:(D.xmin+D.xmax)/2,y:-(D.ymin+D.ymax)/2,z:(D.xmax-D.xmin)/2*.98,w:(D.ymax-D.ymin)/2*.98};E.uFade.value=new t(O.x,O.y,O.z,O.w);let k=te(E),A=new e;A.background=h.clone();let j=new s;A.add(j);{let e=new Float32Array(b*x*3),t=new Float32Array(b*x),n=new Float32Array(b*x*3);for(let n=0;n<x;n++)for(let r=0;r<b;r++){let i=n*b+r;e[i*3]=ie+r*S,e[i*3+1]=w(C(i)),e[i*3+2]=-(ae-n*S),t[i]=se[i]/255}for(let t=0;t<x;t++)for(let r=0;r<b;r++){let i=Math.max(0,r-1),a=Math.min(b-1,r+1),o=Math.max(0,t-1),s=Math.min(x-1,t+1),c=(e[(t*b+a)*3+1]-e[(t*b+i)*3+1])/((a-i)*S),l=(e[(s*b+r)*3+1]-e[(o*b+r)*3+1])/((s-o)*S),u=Math.hypot(c,1,l),d=(t*b+r)*3;n[d]=-c/u,n[d+1]=1/u,n[d+2]=-l/u}let r=new Uint32Array((b-1)*(x-1)*6),i=0;for(let e=0;e<x-1;e++)for(let t=0;t<b-1;t++){let n=e*b+t,a=n+1,o=n+b,s=o+1;r[i++]=n,r[i++]=o,r[i++]=a,r[i++]=a,r[i++]=o,r[i++]=s}let a=new c;a.setAttribute(`position`,new o(e,3)),a.setAttribute(`aMask`,new o(t,1)),a.setAttribute(`aNormal`,new o(n,3)),a.setIndex(new o(r,1));let s=new d(a,k.terrain);s.frustumCulled=!1,j.add(s)}{let e=v(`wKind`),t=v(`wLen`),n=v(`wVerts`),r=[],i=[],a=[],s=0;for(let o=0;o<e.length;o++){let c=t[o],l=[],u=0,d=0;for(let e=0;e<c;e++){let t=e?u+n[(s+e)*2]:n[(s+e)*2],r=e?d+n[(s+e)*2+1]:n[(s+e)*2+1];u=t,d=r,l.push([t/2,r/2])}s+=c;let p=e[o];if(p===2){let e=0;for(let t of l)e+=T(t[0],t[1]);e=e/l.length+.6;let t=l.flatMap(e=>[e[0],e[1]]),n=f.triangulate(t,[],2),o=r.length/3;for(let t of l)r.push(t[0],e,-t[1]),i.push(Math.hypot(t[0],t[1]));for(let e of n)a.push(o+e);continue}let m=p===0?15:p===3?7:3.4,h=[];for(let e=0;e<l.length-1;e++){let[t,n]=l[e],[r,i]=l[e+1],a=Math.hypot(r-t,i-n),o=Math.max(1,Math.ceil(a/25));for(let e=0;e<o;e++)h.push([t+(r-t)*e/o,n+(i-n)*e/o])}h.push(l[l.length-1]);let ee=r.length/3;for(let e=0;e<h.length;e++){let t=h[Math.max(0,e-1)],n=h[Math.min(h.length-1,e+1)],o=n[0]-t[0],s=n[1]-t[1],c=Math.hypot(o,s)||1;o/=c,s/=c;let l=-s*m/2,u=o*m/2,[d,f]=h[e],p=T(d,f)+1.1,g=Math.hypot(d,f);if(r.push(d+l,p,-(f+u),d-l,p,-(f-u)),i.push(g,g),e){let t=ee+(e-1)*2;a.push(t,t+1,t+2,t+1,t+3,t+2)}}}let l=new c;l.setAttribute(`position`,new o(new Float32Array(r),3)),l.setAttribute(`aDist`,new o(new Float32Array(i),1)),l.setIndex(a);let u=new d(l,k.water);u.frustumCulled=!1,j.add(u)}{let e=v(`rClass`),t=v(`rLen`),n=v(`rVerts`),r=[[],[]],a=[[],[]],s=0;for(let i=0;i<e.length;i++){let o=t[i],c=e[i],l=0,u=0,d=null;for(let e=0;e<o;e++){let t=e?l+n[(s+e)*2]:n[(s+e)*2],i=e?u+n[(s+e)*2+1]:n[(s+e)*2+1];l=t,u=i;let o=t/2,f=i/2;if(d){let e=Math.hypot(o-d[0],f-d[1]),t=Math.max(1,Math.ceil(e/30));for(let e=0;e<t;e++){let n=d[0]+(o-d[0])*e/t,i=d[1]+(f-d[1])*e/t,s=d[0]+(o-d[0])*(e+1)/t,l=d[1]+(f-d[1])*(e+1)/t;r[c].push(n,T(n,i)+.8,-i,s,T(s,l)+.8,-l),a[c].push(Math.hypot(n,i),Math.hypot(s,l))}}d=[o,f]}s+=o}[1,0].forEach(e=>{let t=new c;t.setAttribute(`position`,new o(new Float32Array(r[e]),3)),t.setAttribute(`aDist`,new o(new Float32Array(a[e]),1));let n=new i(t,e?k.roadMajor:k.roadMinor);n.frustumCulled=!1,j.add(n)})}let ce=v(`bHeight`),le=v(`bBase`),ue=v(`bRingCount`),de=v(`ringLen`),M=v(`verts`),N=ce.length,P=[],F=[],I=[],fe=[],pe=[],L=0,me=0,R=0,he=()=>new Promise(e=>typeof window.requestIdleCallback==`function`?window.requestIdleCallback(()=>e(),{timeout:40}):setTimeout(e,0)),ge=performance.now();for(;L<N;){let e=Math.min(N,L+1200);for(;L<e;L++){let e=w(le[L]*.1)-.2,t=w(le[L]*.1+1.5)+ce[L]*.5*ee,n=[];for(let e=0;e<ue[L];e++){let e=de[me++],t=[],r=0,i=0;for(let n=0;n<e;n++){let e=n?r+M[(R+n)*2]:M[(R+n)*2],a=n?i+M[(R+n)*2+1]:M[(R+n)*2+1];r=e,i=a,t.push([e*.2,a*.2])}R+=e,n.push(t)}let r=n[0].reduce((e,t)=>e+t[0],0)/n[0].length,i=n[0].reduce((e,t)=>e+t[1],0)/n[0].length,a=Math.hypot(r,i),o=[],s=[],c=P.length/3;n.forEach((n,r)=>{r&&s.push(o.length/2);for(let r of n)o.push(r[0],r[1]),P.push(r[0],t,-r[1]),F.push(a,e,1)});let l=f.triangulate(o,s,2);for(let e=0;e<l.length;e++)I.push(c+l[e]);for(let r of n)for(let n=0;n<r.length;n++){let i=r[n],o=r[(n+1)%r.length],s=P.length/3;P.push(i[0],t,-i[1],o[0],t,-o[1],o[0],e,-o[1],i[0],e,-i[1]),F.push(a,e,1,a,e,1,a,e,0,a,e,0),I.push(s,s+3,s+2,s,s+2,s+1),fe.push(i[0],t,-i[1],o[0],t,-o[1]),pe.push(a,e,1,a,e,1)}}p.onProgress?.(L/N),await he()}let z=new c;z.setAttribute(`position`,new o(new Float32Array(P),3)),z.setAttribute(`aInfo`,new o(new Float32Array(F),3)),z.setIndex(new o(new Uint32Array(I),1));let _e=new d(z,k.buildings);_e.frustumCulled=!1,j.add(_e);let ve=new c;ve.setAttribute(`position`,new o(new Float32Array(fe),3)),ve.setAttribute(`aInfo`,new o(new Float32Array(pe),3));let ye=new i(ve,k.outline);ye.frustumCulled=!1,j.add(ye),P.length=F.length=I.length=fe.length=pe.length=0;let be=performance.now()-ge,xe=new s;j.add(xe);let B=T(0,0),Se=new l(`#ed1c24`),Ce=new l(`#1e1a15`),V=e=>new n({uniforms:{uC:{value:new a(e.r,e.g,e.b)}},side:2,vertexShader:`void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`uniform vec3 uC; void main(){gl_FragColor=vec4(uC,1.0);}`}),we=110/130,H=new d(y(46,.01,0,360,0,0,1),V(Se));H.rotation.x=-Math.PI/2,H.position.set(0,B+2,0);let U=new d(y(14,.01,0,360,0,0,1),V(Ce));U.rotation.x=-Math.PI/2,U.position.set(0,B+2.2,0);let W=new i(new c().setAttribute(`position`,new o(new Float32Array([0,B+2,0,0,B+230,0]),3)),new n({vertexShader:`void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`void main(){gl_FragColor=vec4(0.929,0.11,0.141,1.0);}`})),G=new s;G.position.set(0,B+230,0);let Te=y(130,42,28,208,0,0,we),Ee=y(130,42,208,335,0,0,we);G.add(new d(Te,V(Se)),new d(Ee,V(Ce))),xe.add(H,U,W,G);let K=new u({canvas:p.canvas,antialias:!0,alpha:!1,powerPreference:`high-performance`,preserveDrawingBuffer:!!p.capture});K.setClearColor(h,1);let q=new r(-1,1,1,-1,50,2e4),De=2700,J=new a(-700,40,-1e3),Oe=40*Math.PI/180,ke=e=>{let t=e*Math.PI/180,n=6e3;q.position.set(J.x+Math.sin(t)*Math.cos(Oe)*n,J.y+Math.sin(Oe)*n,J.z+Math.cos(t)*Math.cos(Oe)*n),q.lookAt(J),q.updateMatrixWorld(),G.quaternion.copy(q.quaternion)},Ae=()=>{let e=Math.max(1,p.frame.clientWidth),t=Math.max(1,p.frame.clientHeight),n=e/t;q.left=-2700*n/2,q.right=De*n/2,q.top=De/2,q.bottom=-1350,q.updateProjectionMatrix(),K.setPixelRatio(Math.min(window.devicePixelRatio||1,p.dprCap)),K.setSize(e,t,!1)},Y=0,X=!0,je=!1,Z=()=>{X=!1,K.render(A,q)},Me=()=>{!X&&!Y&&(X=!0,requestAnimationFrame(()=>{!je&&X&&Z()}))};Ae();let Ne=new ResizeObserver(()=>{Ae(),Me()});Ne.observe(p.frame);let Pe={ring:[0,B+230+110,0],ground:[0,B,0]},Fe=(e,t=0)=>{ke(t);let n=(Array.isArray(e)?new a(...e):e.clone()).project(q);return{x:+((n.x+1)/2*100).toFixed(2),y:+((1-n.y)/2*100).toFixed(2)}},Ie=(e,t,n=0)=>new a(e,T(e,t)+n,-t),Q=e=>1-(1-Math.min(1,Math.max(0,e)))**3,Le=e=>{{let t=Math.min(1,Math.max(0,e/1.9));E.uWave.value=t*t*(3-2*t)}E.uRiver.value=6e3*Q((e-.35)/1.4),G.position.y=B+230+520*(1-Q((e-1.45)/.65)),W.visible=e>1.5,xe.visible=e>1.3;let t=Q((e-1.45)/.65);H.scale.setScalar(Math.max(.001,t)),U.scale.setScalar(Math.max(.001,t)),W.geometry.attributes.position.setY(1,G.position.y),W.geometry.attributes.position.needsUpdate=!0,ke(9*(1-Q(e/2.2)))},Re=()=>{Le(10)};Re(),Z();let $=0;return{play:e=>{let t=performance.now(),n=!1,r=()=>{n||(n=!0,cancelAnimationFrame($),Y=0,Re(),Z(),s(),e())},i=()=>{let e=(performance.now()-t)/1e3;e>=2.2?r():(Le(e),Z(),$=requestAnimationFrame(i),Y=$)},a=()=>r(),o=[[`wheel`,window],[`keydown`,window],[`pointerdown`,window],[`touchstart`,window],[`scroll`,window]],s=()=>o.forEach(([e,t])=>t.removeEventListener(e,a));o.forEach(([e,t])=>t.addEventListener(e,a,{passive:!0,once:!0})),Le(0),Z(),Y=$=requestAnimationFrame(i)},final:()=>{Re(),Z()},request:Me,dispose:()=>{je||(je=!0,cancelAnimationFrame($),Ne.disconnect(),j.traverse(e=>{e.geometry?.dispose?.(),e.material?.dispose?.()}),K.dispose(),K.forceContextLoss())},project:Fe,toWorld:Ie,labelPoints:Pe,stats:{buildings:N,buildMs:be},place:ke,groundY:T,canvas:p.canvas}}export{b as initTown};