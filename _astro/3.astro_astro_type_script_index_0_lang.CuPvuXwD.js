import{A as e,D as t,E as n,F as r,M as i,N as a,O as o,P as s,S as c,T as l,_ as u,a as d,c as f,g as p,h as m,i as h,j as g,l as _,m as v,n as y,o as b,p as x,r as S,s as C,t as w,u as T,w as E,x as D,y as O}from"./gabrovo.meta.CxgP_N-B.js";import{n as ee,r as k,t as te}from"./SplitText.fFbKpyM1.js";import{a as A,i as j,n as M,t as ne}from"./logoShapes.DxnGXufO.js";var re=[{id:`business`,name:`Бизнес`,role:`Иновативни компании от мехатрониката, чистите технологии и ИКТ.`,color:j.yellow},{id:`science`,name:`Наука`,role:`Технически университет – Габрово.`,color:j.ink},{id:`administration`,name:`Администрация`,role:`Община Габрово и Областна администрация Габрово.`,color:j.blue},{id:`civil`,name:`Гражданско общество`,role:`Гражданите, училищата и организациите в региона, за които работим.`,color:j.red}].map(e=>e.color);v.enabled=!1;var ie=new x(`#fbf8f1`),N=(e,t)=>{let n=t*Math.PI/180;return[A.cx+e*Math.cos(n),A.cy-e*Math.sin(n)]},P=(e,t,n,r,i,a)=>Array.from({length:i},(o,s)=>{let c=t+r*s/(i-1);return{L:[e,c],R:[e+n,c],c:a}}),ae=(e,t)=>Array.from({length:e},(n,r)=>{let i=87-80*Math.cos(Math.PI*r/(e-1)),a=Math.sqrt(Math.max(0,6400-(i-87)**2));return{L:[102,i],R:[115+a,i],c:t}}),F=(e,t)=>Array.from({length:e},(n,r)=>{let i=150+104*r/(e-1);return{L:[102,i],R:[153+57*(i-150)/104,i],c:t}}),I=(e,t,n,r)=>Array.from({length:n},(i,a)=>{let o=e+(t-e)*a/(n-1);return{L:N(A.r,o),R:N(A.R,o),c:r}}),L=[[{w:1,make:e=>P(M.R.stem.x,M.R.stem.y,M.R.stem.w,M.R.stem.h,e,j.yellow)}],[{w:160,make:e=>ae(e,j.ink)},{w:104,make:e=>F(e,j.grey)},{w:190,make:e=>I(208,335,e,j.ink)}],[{w:1,make:e=>P(M.I.bar.x,M.I.bar.y,M.I.bar.w,M.I.bar.h,e,j.blue)}],[{w:1,make:e=>I(28,208,e,j.red)}]];function oe(e,t){let n=t-(e.length-1)*2,r=e.reduce((e,t)=>e+t.w,0),i=e.map(e=>Math.max(4,Math.round(n*e.w/r)));i[i.length-1]+=n-i.reduce((e,t)=>e+t,0);let a=[];return e.forEach((e,t)=>{let n=e.make(i[t]);if(t>0){let e=a[a.length-1];a.push({L:e.L,R:e.L,c:e.c}),a.push({L:n[0].L,R:n[0].L,c:n[0].c})}a.push(...n)}),a}var R=`
#define TAU 6.28318530718
attribute vec3 aB;
attribute vec3 aC;
attribute vec3 aColB;
uniform float uIntro, uRot, uTurns, uTwist, uRho, uHW, uHelixScale, uFold, uStag, uLogoK, uRelief, uToC, uSkew;
uniform vec3 uHelixOffset;
uniform mat3 uHelixRot;
uniform vec2 uEdge, uLogoOffset;
uniform mat4 uPlateM;
uniform float uFw[4];
uniform float uDim[4];
uniform vec3 uCol[4];
varying vec3 vWorld;
varying vec3 vCol;
varying float vEdge, vS, vR, vMB, vDim, vHelixZ;
varying vec3 vN;

float ease(float x){ return x*x*(3.0-2.0*x); }

vec3 helixW(float s, float w, float r, int ri, float ea){
  float fw = uFw[ri];
  float rad = uRho * (1.0 + 0.34 * fw);
  float th = (s - 0.5) * uTurns * TAU * uTwist + uRot + r * 1.57079632679 + (1.0 - ea) * 6.0;
  vec3 radial = vec3(cos(th), 0.0, sin(th));
  vec3 axis = vec3(0.0, 1.0, 0.0);
  float a = uSkew * (0.5 + 0.5 * cos(th * 2.0));
  vec3 wd = normalize(axis * cos(a) + radial * sin(a));
  vec3 hp = radial * rad + axis * (s - 0.5) + wd * (w * uHW);
  return uHelixRot * (hp * uHelixScale) + uHelixOffset;
}

void main(){
  float s = position.x;
  float w = position.y;
  float r = position.z;
  int ri = int(r + 0.5);

  // --- helix (world = offset + rot * unit helix * scale) ---
  float arrive = clamp(uIntro * 2.6 - (1.0 - s) * 1.6, 0.0, 1.0);
  float ea = ease(arrive);
  vec3 hw3 = helixW(s, w, r, ri, ea);
  float e0 = 0.004;
  vec3 Tn = helixW(min(s + e0, 1.0), 0.0, r, ri, ea) - helixW(max(s - e0, 0.0), 0.0, r, ri, ea);
  vec3 Wn = helixW(s, 1.0, r, ri, ea) - helixW(s, -1.0, r, ri, ea);
  vN = normalize(cross(Tn, Wn) + vec3(1e-7));
  float fw = uFw[ri];
  float rad = uRho * (1.0 + 0.34 * fw);
  float th = (s - 0.5) * uTurns * TAU * uTwist + uRot + r * 1.57079632679 + (1.0 - ea) * 6.0;
  vHelixZ = (uHelixRot * (vec3(cos(th), 0.0, sin(th)) * rad * uHelixScale)).z;
  vec3 wd = vec3(0.0, 1.0, 0.0);

  // sweep-in from the screen edge of this ribbon
  float ea0 = 3.14159265 - r * 1.57079632679;
  vec2 d = vec2(cos(ea0), sin(ea0));
  vec2 per = vec2(-d.y, d.x);
  vec3 entry = vec3(d * uEdge * 1.25 + per * (s - 0.5) * uEdge * 1.1, -0.8);
  entry.y += w * uHW * uHelixScale;
  vec3 cmid = vec3(0.0, 0.0, 0.6);
  vec3 pw = mix(mix(entry, cmid, ea), mix(cmid, hw3, ea), ea);

  // --- fold to the flat logo ---
  float mRaw = clamp(uFold * (1.0 + uStag) - s * uStag, 0.0, 1.0);
  float mB = ease(mRaw);
  vec3 bw = vec3(uLogoOffset.x + (aB.x - 300.0) * uLogoK, uLogoOffset.y - (aB.y - 131.0) * uLogoK, 0.0);
  pw = mix(pw, bw, mB);
  pw.z += sin(mRaw * 3.14159265) * (0.55 + 0.25 * r) * (1.0 - uToC);

  // --- strands on the map plate ---
  vec3 cw = (uPlateM * vec4(aC.xy, aC.z * uRelief, 1.0)).xyz;
  pw = mix(pw, cw, uToC);

  vWorld = pw;
  vS = s; vR = r; vEdge = w; vMB = max(mB, uToC);
  vec3 base = mix(uCol[ri], aColB, mB);
  vCol = mix(base, uCol[ri], uToC);
  vDim = uDim[ri] * (1.0 - uToC);
  gl_Position = projectionMatrix * viewMatrix * vec4(pw, 1.0);
}
`,z=`
uniform float uAlpha, uDraw, uToC, uCase, uShadowK, uRho, uHelixScale;
uniform vec3 uPaper;
varying vec3 vWorld;
varying vec3 vCol;
varying float vEdge, vS, vR, vMB, vDim, vHelixZ;
varying vec3 vN;

void main(){
  float dr = clamp(uDraw * 1.4 - 0.13 * vR, 0.0, 1.0);
  if (uToC > 0.5 && vS > dr) discard;
  #ifdef SHADOW
    float e = 1.0 - smoothstep(0.2, 1.0, abs(vEdge));
    gl_FragColor = vec4(0.2, 0.13, 0.05, 0.22 * e * uAlpha * uShadowK);
    return;
  #endif
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vWorld);
  if (dot(N, V) < 0.0) N = -N;
  vec3 L = normalize(vec3(-0.5, 0.7, 0.55));
  float lit = 0.88 + 0.18 * (0.5 + 0.5 * dot(N, L));
  lit *= 0.94 + 0.06 * pow(clamp(dot(N, V), 0.0, 1.0), 0.7);
  lit = mix(lit, 1.0, vMB);
  vec3 col = vCol * lit;
  col += (1.0 - vMB) * 0.03;
  // atmosphere: far side of the helix recedes into the paper
  float depth = clamp(vHelixZ / (uRho * uHelixScale) * 0.5 + 0.5, 0.0, 1.0);
  col = mix(col, uPaper, (1.0 - depth) * 0.26 * (1.0 - vMB));
  float ed = abs(vEdge);
  col *= 1.0 - 0.09 * smoothstep(0.78, 1.0, ed) * (1.0 - vMB);
  col = mix(col, vec3(0.176, 0.153, 0.125), smoothstep(0.55, 0.92, ed) * uCase * 0.9);
  col = mix(col, uPaper, vDim * 0.58);
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col *= 0.988 + 0.024 * g;
  gl_FragColor = vec4(col, uAlpha);
}
`;function se(e){let t=e,a=(t+1)*2*4,o=new Float32Array(a*3),c=new Float32Array(a*3),u=new Float32Array(a*3),d=new Float32Array(a*3),p=[],m=new x,h=L.map(e=>oe(e,t+1));for(let e=0;e<4;e++){let n=e*(t+1)*2;for(let r=0;r<=t;r++){for(let i=0;i<2;i++){let a=n+r*2+i;o.set([r/t,i?1:-1,e],a*3);let s=h[e][r],l=i?s.R:s.L;c.set([l[0],l[1],0],a*3),m.set(s.c),d.set([m.r,m.g,m.b],a*3)}if(r<t){let e=n+r*2;p.push(e,e+1,e+2,e+1,e+3,e+2)}}}let g=new _;g.setAttribute(`position`,new f(o,3)),g.setAttribute(`aB`,new f(c,3));let v=new f(u,3);g.setAttribute(`aC`,v),g.setAttribute(`aColB`,new f(d,3)),g.setIndex(p);let y={uIntro:{value:0},uRot:{value:0},uTurns:{value:2.4},uTwist:{value:1},uRho:{value:.14},uHW:{value:.03},uHelixScale:{value:10},uFold:{value:0},uStag:{value:.6},uLogoK:{value:.01},uRelief:{value:1},uToC:{value:0},uSkew:{value:.5},uHelixOffset:{value:new r},uHelixRot:{value:new E},uEdge:{value:new s(8,6)},uLogoOffset:{value:new s},uPlateM:{value:new l},uFw:{value:[0,0,0,0]},uDim:{value:[0,0,0,0]},uCol:{value:re.map(e=>new x(e))},uAlpha:{value:1},uDraw:{value:0},uCase:{value:0},uShadowK:{value:1},uPaper:{value:ie}},b=e=>new i({uniforms:y,vertexShader:R,fragmentShader:z,side:2,transparent:!0,depthWrite:!e,depthTest:!e,defines:e?{SHADOW:1}:{}}),S=new n(g,b(!1)),C=new n(g,b(!0));return S.frustumCulled=C.frustumCulled=!1,C.renderOrder=2,S.renderOrder=3,C.material.vertexShader=R.replace(`gl_Position = projectionMatrix * viewMatrix * vec4(pw, 1.0);`,`gl_Position = projectionMatrix * viewMatrix * vec4(pw + vec3(0.075, -0.1, -0.35), 1.0);`),{mesh:S,shadow:C,uniforms:y,geo:g,cAttr:v,N:t}}w.bbox,w.oblastBbox;var B=w.viewBox;`${B.width}${B.height}`,w.projection.cosLat,w.projection.unitsPerDegLat;var V={min:w.heightmap.elevationMin,max:w.heightmap.elevationMax},H={height1024:`/ric-website-preview/geo/gabrovo-height.png`,height512:`/ric-website-preview/geo/gabrovo-height-512.png`,hillshade:`/ric-website-preview/geo/gabrovo-hillshade.webp`,hillshadeOblast:`/ric-website-preview/geo/gabrovo-hillshade-oblast.webp`,hillshade900:`/ric-website-preview/geo/gabrovo-hillshade-900.webp`};w.heightmap.sizes[1024],w.heightmap.sizes[512];var U={scale:y.scale,tx:y.tx,ty:y.ty};`${U.tx}${U.ty}${U.scale}`,y.rectInBulgaria;var W=e=>d.find(t=>t.id===e),G=2.9,K=77.68,q=e=>(e-V.min)/K*G;async function ce(e){let t=await(await fetch(e)).blob(),n=await createImageBitmap(t,{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=document.createElement(`canvas`);r.width=n.width,r.height=n.height;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(n,0,0);let a=i.getImageData(0,0,r.width,r.height).data,o=new Float32Array(r.width*r.height),s=V.max-V.min;for(let e=0;e<o.length;e++)o[e]=V.min+(a[e*4]*256+a[e*4+1])/65535*s;return{w:r.width,h:r.height,data:o}}function J(e,t,n){let r=Math.min(Math.max(t/B.width*e.w-.5,0),e.w-1.001),i=Math.min(Math.max(n/B.height*e.h-.5,0),e.h-1.001),a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=e.data,u=e.w,d=l[o*u+a],f=l[o*u+a+1],p=l[(o+1)*u+a],m=l[(o+1)*u+a+1];return(d*(1-s)+f*s)*(1-c)+(p*(1-s)+m*s)*c}function Y(e){let t=Math.round(e*B.height/B.width),n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=e/B.width;r.scale(i,i),r.lineJoin=`round`,r.lineCap=`round`,r.strokeStyle=`rgba(45,39,32,0.5)`,r.lineWidth=1.5,r.setLineDash([7,5]);for(let e of S)r.stroke(new Path2D(e.d));r.setLineDash([]),r.strokeStyle=`#3853a4`;for(let e of b)r.lineWidth=e.id===`yantra`?3.4:2.6,r.stroke(new Path2D(e.d));let a=new Path2D(h);r.strokeStyle=`rgba(251,248,241,0.9)`,r.lineWidth=7,r.stroke(a),r.strokeStyle=`#2d2720`,r.lineWidth=2.6,r.stroke(a);let o=new T(n);return o.flipY=!1,o.colorSpace=``,o.anisotropy=8,o.generateMipmaps=!0,o.minFilter=c,o}var X=`
attribute float aElev;
uniform float uRelief;
varying vec2 vUv;
varying float vE;
void main(){
  vUv = vec2(position.x / ${B.width.toFixed(1)}, position.y / ${B.height.toFixed(1)});
  vE = aElev;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, position.z * uRelief, 1.0);
}`,le=`
uniform sampler2D uHill, uHeight, uOver;
uniform float uContour, uAlpha;
varying vec2 vUv;
varying float vE;
void main(){
  vec4 hs = texture2D(uHill, vUv);
  if (hs.a < 0.02) discard;
  float e = texture2D(uHeight, vUv).r;
  float t = clamp((e - 120.0) / 1150.0, 0.0, 1.0);
  vec3 lowC = vec3(0.992, 0.972, 0.925);
  vec3 midC = vec3(0.945, 0.895, 0.785);
  vec3 hiC  = vec3(0.855, 0.770, 0.630);
  vec3 col = mix(mix(lowC, midC, smoothstep(0.0, 0.5, t)), hiC, smoothstep(0.45, 1.0, t));
  float sh = hs.r;
  col *= mix(0.58, 1.08, smoothstep(0.3, 0.9, sh));
  // contours: 100 m, index 500 m
  float f = e / 100.0;
  float fwd = max(fwidth(f), 1e-4);
  float g = abs(fract(f - 0.5) - 0.5) / fwd;
  float line = (1.0 - smoothstep(0.2, 1.25, g)) * (1.0 - smoothstep(0.35, 0.8, fwd));
  float fi = e / 500.0;
  float gi = abs(fract(fi - 0.5) - 0.5) / max(fwidth(fi), 1e-4);
  float idx = (1.0 - smoothstep(0.3, 1.9, gi)) * (1.0 - smoothstep(0.08, 0.2, fwidth(fi)));
  vec3 ink = vec3(0.30, 0.22, 0.12);
  col = mix(col, ink, (line * 0.30 + idx * 0.42) * uContour);
  vec4 ov = texture2D(uOver, vUv);
  col = mix(col, ov.rgb, ov.a);
  gl_FragColor = vec4(col, hs.a * uAlpha);
}`,ue=`
varying vec2 vUv;
void main(){
  vUv = vec2(position.x / ${B.width.toFixed(1)}, position.y / ${B.height.toFixed(1)});
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,de=`
uniform sampler2D uHill;
uniform float uAlpha;
varying vec2 vUv;
void main(){
  float a = texture2D(uHill, vUv, 4.5).a;
  gl_FragColor = vec4(0.22, 0.14, 0.05, a * 0.26 * uAlpha);
}`;async function fe(t){let r=await ce(t?H.height512:H.height1024),s=await new a().loadAsync(H.hillshadeOblast);s.flipY=!1,s.colorSpace=``,s.premultiplyAlpha=!1,s.anisotropy=8,s.needsUpdate=!0;let c=new Uint16Array(r.data.length);for(let e=0;e<c.length;e++)c[e]=p.toHalfFloat(r.data[e]);let l=new m(c,r.w,r.h,e,O);l.minFilter=D,l.magFilter=D,l.flipY=!1,l.colorSpace=``,l.needsUpdate=!0;let u=Y(t?1024:2048),d=t?170:340,h=Math.round(d*B.height/B.width),g=new Float32Array((d+1)*(h+1)*3),v=new Float32Array((d+1)*(h+1));for(let e=0;e<=h;e++)for(let t=0;t<=d;t++){let n=t/d*B.width,i=e/h*B.height,a=J(r,n,i),o=e*(d+1)+t;g.set([n,i,q(a)],o*3),v[o]=a}let y=[];for(let e=0;e<h;e++)for(let t=0;t<d;t++){let n=e*(d+1)+t,r=n+1,i=n+d+1,a=i+1;y.push(n,i,r,r,i,a)}let b=new _;b.setAttribute(`position`,new f(g,3)),b.setAttribute(`aElev`,new f(v,1)),b.setIndex(y);let x={uHill:{value:s},uHeight:{value:l},uOver:{value:u},uContour:{value:1},uAlpha:{value:1},uRelief:{value:1}},S=new i({uniforms:x,vertexShader:X,fragmentShader:le,side:2,transparent:!0}),C=new n(b,S);C.matrixAutoUpdate=!1,C.frustumCulled=!1,C.renderOrder=1;let w=new o(B.width,B.height);w.translate(B.width/2,B.height/2,-30);let T=new i({uniforms:{uHill:{value:s},uAlpha:x.uAlpha},vertexShader:ue,fragmentShader:de,transparent:!0,depthWrite:!1,side:2}),E=new n(w,T);return E.matrixAutoUpdate=!1,E.frustumCulled=!1,E.renderOrder=0,{heights:r,mesh:C,shadow:E,uniforms:x,dispose(){b.dispose(),w.dispose(),s.dispose(),l.dispose(),u.dispose(),S.dispose(),T.dispose()}}}function pe(e,t,n,r){let i=b.find(e=>e.id===`yantra`).d.split(`M`).filter(Boolean).map(e=>{let t=e.match(/-?\d+\.?\d*/g).map(Number),n=[];for(let e=0;e<t.length;e+=2)n.push([t[e],t[e+1]]);return n}),a=[...i[3].slice().reverse(),...i[1].slice().reverse(),...i[0].slice().reverse()],o=document.createElement(`canvas`).getContext(`2d`),s=new Path2D(h),c=a.findIndex(e=>o.isPointInPath(s,e[0],e[1]));c<0&&(c=0),a=a.slice(c),a.push(n);for(let e=0;e<24;e++)a=a.map((e,t)=>{let n=a[Math.max(0,t-4)],r=a[Math.min(a.length-1,t+4)];return t===0||t===a.length-1?e:[(n[0]+e[0]*2+r[0])/4,(n[1]+e[1]*2+r[1])/4]});let l=[0];for(let e=1;e<a.length;e++)l.push(l[e-1]+Math.hypot(a[e][0]-a[e-1][0],a[e][1]-a[e-1][1]));let u=l[l.length-1],d=e=>{let t=e*u,n=1;for(;n<l.length-1&&l[n]<t;)n++;let r=(t-l[n-1])/Math.max(1e-6,l[n]-l[n-1]),i=a[n-1][0]+(a[n][0]-a[n-1][0])*r,o=a[n-1][1]+(a[n][1]-a[n-1][1])*r,s=a[n][0]-a[n-1][0],c=a[n][1]-a[n-1][1],d=Math.hypot(s,c)||1;return[i,o,-c/d,s/d]},f=[-24,-8,8,24],p=new Float32Array(4*(t+1)*2*3),m=0;for(let n=0;n<4;n++){let i=[];for(let e=0;e<=t;e++){let r=e/t,[a,o,s,c]=d(r),l=(1-r)**1.1,u=f[n]*l+Math.sin(r*9+n*1.7)*2*l;i.push([a+s*u,o+c*u])}for(let e=0;e<6;e++)i=i.map((e,n)=>n===0||n===t?e:[(i[n-1][0]+e[0]*2+i[n+1][0])/4,(i[n-1][1]+e[1]*2+i[n+1][1])/4]);for(let n=0;n<=t;n++){let a=i[Math.max(0,n-1)],o=i[Math.min(t,n+1)],s=o[0]-a[0],c=o[1]-a[1],l=Math.hypot(s,c)||1,u=-c/l,d=s/l;for(let t of[-1,1]){let a=i[n][0]+u*t*r,o=i[n][1]+d*t*r;p[m++]=a,p[m++]=o,p[m++]=q(J(e,a,o))+7}}}return p}k.registerPlugin(ee,te);var Z=document.querySelector(`[data-k3]`);Z&&me(Z);function me(e){let n=t=>e.querySelector(t),i=t=>[...e.querySelectorAll(t)],a=n(`[data-pin]`),o=n(`[data-canvas]`),s=document.documentElement,c;try{c=new C({canvas:o,antialias:!0,alpha:!0,powerPreference:`high-performance`})}catch{return d()}function d(){s.classList.remove(`k3-live`)}o.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),ee.getAll().forEach(e=>e.kill()),k.ticker.remove(ge),d()});let f=innerWidth<820,p=se(f?220:360),m=p.uniforms,h=new g;h.add(p.shadow,p.mesh);let _=new t(30,1,.1,200),v={intro:0,spinW:1,who:0,beat:.5,loose:0,tight:0,hx:0,lean:.2,pitch:.16,fold:0,alpha:1,logoShow:0,toC:0,plateUp:0,relief:0,lockup:0,marker:0,land:0,clock:0,draw:0,labIntro:0,labOut:0,mapLab:0,final:0},y={W:1,H:1,mobile:!1,helixC:{x:0,y:0},helixH:1,rho:.15,logoC:{x:0,y:0},logoK:1,lockX:0,lockY:0,lockK:.2,plateC:{x:0,y:0},plateW:1,tilt:.7,plateRise:1},b=i(`[data-letter]`),x=n(`[data-clock]`),S=e=>ne[e].split(` `).map(Number),w=n(`[data-slot]`),T=n(`[data-halo]`);function E(){let e=a.clientWidth,t=a.clientHeight;y.W=e,y.H=t,y.mobile=e<820,c.setPixelRatio(Math.min(window.devicePixelRatio||1,y.mobile?1.6:2)),c.setSize(e,t,!1),_.aspect=e/t;let n=t/100/2/Math.tan(30*Math.PI/360);if(_.position.set(0,0,n),_.updateProjectionMatrix(),_.updateMatrixWorld(!0),m.uEdge.value.set(e/200,t/200),y.mobile)y.helixC={x:e*.5,y:t*.33},y.helixH=t*.66,y.rho=.19,y.logoC={x:e*.5,y:t*.34},y.logoK=e*.94/600,y.lockX=16,y.lockY=86,y.lockK=.17,y.plateC={x:e*.5,y:t*.38},y.plateW=e*1.04,y.tilt=.5;else{y.helixC={x:e*.7,y:t*.5},y.helixH=t*1.18,y.rho=.15,y.logoC={x:e*.5,y:t*.4},y.logoK=Math.min(e*.6,t*1.55)/600;let n=a.getBoundingClientRect(),r=w.getBoundingClientRect();y.lockX=r.left-n.left,y.lockY=r.top-n.top,y.lockK=r.height/262;let i=e<1200;y.plateC={x:e*(i?.7:.675),y:t*.45},y.plateW=e*(i?.54:.6),y.tilt=.62}y.plateRise=t*1.05;let r=y.logoK;for(let e of[...b,x]){let t=e.dataset.letter??`C`,n=S(t);e.style.width=`${n[2]*r}px`,e.style.height=`${n[3]*r}px`}m.uLogoK.value=r/100,m.uLogoOffset.value.set((y.logoC.x-e/2)/100,(t/2-y.logoC.y)/100)}let D=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),O=e=>(e=D(e),e*e*(3-2*e)),A=(e,t,n)=>e+(t-e)*n,j=new r,M=(e,t,n,r)=>(j.set(e,t,n),r&&j.applyMatrix4(r),j.project(_),{x:(j.x*.5+.5)*y.W,y:(-j.y*.5+.5)*y.H}),re=e=>new r((e.x-y.W/2)/100,(y.H/2-e.y)/100,0),ie=i(`[data-beat]`),N=i(`[data-nm]`),P=n(`[data-who]`),ae=i(`[data-lab]`),F=i(`[data-pl]`),I=i(`[data-riv]`);new Map(F.map(e=>[e.dataset.pl,e]));let L=e=>b.find(t=>t.dataset.letter===e),oe=L(`R`),R=L(`I`),z=L(`C`),V=null,H=new l,U=new l;fe(f).then(e=>{V=e,e.mesh.visible=e.shadow.visible=!1,h.add(e.shadow,e.mesh);let t=W(`ric`),n=pe(e.heights,p.N,[t.x,t.y],f?4:3.2);p.cAttr.array.set(n),p.cAttr.needsUpdate=!0,Q=!0}).catch(e=>console.warn(`terrain failed`,e));let G=new l;function K(e,t){let n=(1-J(t))*y.plateRise,r=A(y.tilt+.5,y.tilt,J(t)),i=y.plateW/B.width/100;e.makeTranslation((y.plateC.x-y.W/2)/100,(y.H/2-y.plateC.y-n)/100,0),e.multiply(U.makeRotationX(-r)),e.multiply(U.makeScale(i,-i,i)),e.multiply(U.makeTranslation(-B.width/2,-B.height/2,0))}function ce(){K(H,v.plateUp),K(G,1),m.uPlateM.value.copy(H),V&&(V.mesh.matrix.copy(H),V.shadow.matrix.copy(H),V.mesh.matrixWorldNeedsUpdate=!0,V.shadow.matrixWorldNeedsUpdate=!0,V.uniforms.uRelief.value=v.relief,V.uniforms.uContour.value=D((v.plateUp-.25)/.45),V.uniforms.uAlpha.value=D(v.plateUp*5),V.mesh.visible=V.shadow.visible=v.plateUp>.001)}let J=e=>1-(1-D(e))**3,Y=0,X=new l,le=new u,ue=[.3,.42,.56,.68];function de(e){Y+=e*14e-5;let t=2.5-.9*v.loose,n=1-.72*v.tight,i=y.rho*(1+.42*v.loose)*(1-.5*v.tight),a=Math.PI/2-(v.beat-.5)*(Math.PI/2)+Y*v.spinW*6.2832,o=[0,1,2,3].map(e=>1-O((Math.abs(v.beat-(e+.5))-.28)/.34));m.uIntro.value=v.intro,m.uRot.value=a,m.uTurns.value=t,m.uTwist.value=n,m.uRho.value=i,m.uSkew.value=.5+.9*v.tight,m.uFold.value=v.fold,m.uToC.value=v.toC,m.uAlpha.value=v.alpha,m.uDraw.value=v.draw,m.uCase.value=v.toC*.9,m.uShadowK.value=A(1,.55,v.fold),m.uRelief.value=v.relief,m.uFw.value=o.map(e=>e*v.who),m.uDim.value=o.map(e=>(1-Math.max(e,.42))*v.who);let s=O(v.hx),c={x:A(y.helixC.x,y.logoC.x,s),y:A(y.helixC.y,y.logoC.y,s)},l=y.helixH*(1-.2*s)/100;m.uHelixScale.value=l,m.uHelixOffset.value.copy(re(c)),le.set(v.pitch,0,v.lean),X.makeRotationFromEuler(le),m.uHelixRot.value.setFromMatrix4(X),ce();let u=v.labIntro*(1-v.labOut);ae.forEach((e,o)=>{if(u<=.001){e.style.opacity=`0`,e.style.visibility=`hidden`;return}let s=1/(t*n),c=.5+(Math.PI/2-a-o*Math.PI/2)/(t*Math.PI*2*n),d=c+Math.round((ue[o]-c)/s)*s,f=(d-.5)*t*Math.PI*2*n+a+o*Math.PI/2,p=i*(1+.34*m.uFw.value[o]),h=new r(Math.cos(f)*p,d-.5,Math.sin(f)*p).multiplyScalar(l).applyMatrix3(m.uHelixRot.value).add(m.uHelixOffset.value),g=M(h.x,h.y,h.z),_=(1-O((Math.abs(d-.5)-.26)/.1))*(1-O((92-g.y)/60))*(1-O((g.y-(y.H-70))/50)),v=u*_;e.style.opacity=v.toFixed(3),e.style.visibility=v>.01?`visible`:`hidden`,e.style.transform=`translate(${(g.x+14).toFixed(1)}px, ${(g.y-14).toFixed(1)}px)`}),P.style.opacity=v.who.toFixed(3),N.forEach((e,t)=>{e.style.opacity=(.14+.86*o[t]).toFixed(3)}),ie.forEach((e,t)=>{let n=O((o[t]-.45)/.55),r=Math.sign(v.beat-(t+.5));e.style.opacity=n.toFixed(3),e.style.visibility=n>.01&&v.who>.01?`visible`:`hidden`,e.style.setProperty(`--dy`,`${(r*(1-n)*24).toFixed(1)}px`)});let d=y.logoK,f=y.logoC.x-300*d,p=y.logoC.y-131*d,h=O(v.lockup);for(let e of[oe,R]){let t=S(e.dataset.letter),n=f+t[0]*d,r=p+t[1]*d,i=y.lockX+t[0]*y.lockK,a=y.lockY+t[1]*y.lockK,o=A(1,y.lockK/d,h);e.style.transform=`translate(${A(n,i,h).toFixed(2)}px, ${A(r,a,h).toFixed(2)}px) scale(${o.toFixed(4)})`,e.style.opacity=String(v.logoShow),e.style.visibility=v.logoShow>.002?`visible`:`hidden`}{let e=S(`C`),t=f+e[0]*d,n=p+e[1]*d;x.style.transform=`translate(${(y.lockX+e[0]*y.lockK).toFixed(2)}px, ${(y.lockY+e[1]*y.lockK).toFixed(2)}px) scale(${(y.lockK/d).toFixed(4)})`,x.style.opacity=String(v.clock),x.style.visibility=v.clock>.002?`visible`:`hidden`;let r=W(`ric`),i=M(r.x,r.y,q(r.elevation),G),a=y.mobile?40:54,o=a/(e[2]*d),s=(474-e[0])/e[2],c=(131-e[1])/e[3],l=v.marker,u=Math.sin(Math.PI*D(l))*y.H*.1,m=A(1,o,O(D(l*1.3)))*(1+.45*(1-D(v.land))*O(D((l-.9)*10))),h=O(D(l)),g=(1-D(v.land))*y.H*.05*O(D((l-.9)*10)),_=A(t+s*e[2]*d,i.x,h),b=A(n+c*e[3]*d,i.y,h)-u-g;z.style.transform=`translate(${(_-s*e[2]*d*m).toFixed(2)}px, ${(b-c*e[3]*d*m).toFixed(2)}px) scale(${m.toFixed(4)})`,z.style.opacity=String(v.logoShow),z.style.visibility=v.logoShow>.002?`visible`:`hidden`,T.style.setProperty(`--halo-t`,`translate(${i.x.toFixed(1)}px, ${i.y.toFixed(1)}px)`),T.classList.toggle(`is-on`,v.land>.98&&v.mapLab>.2);let C=v.mapLab;F.forEach(e=>{let t=e.dataset.pl,n=W(t);if(!n)return;let r=t===`ric`?i:M(n.x,n.y,q(n.elevation)*v.relief,v.plateUp>=1?G:H),o=e.classList.contains(`k3__pl--l`)?`l`:e.classList.contains(`k3__pl--t`)?`t`:e.classList.contains(`k3__pl--b`)?`b`:`r`,s=0,c=+(e.dataset.dy??0);t===`ric`&&(s=-(a/2+4),c=a/2-4),t===`gabrovo`&&(s=-(a/2+2),c=-a/2+8);let l=(r.x+s).toFixed(1),u=(r.y+c).toFixed(1);e.style.transform=o===`l`?`translate(${l}px, ${u}px) translate(calc(-100% + 5px), -50%)`:o===`t`?`translate(${l}px, ${u}px) translate(-50%, calc(-100% - 8px))`:o===`b`?`translate(${l}px, ${u}px) translate(-50%, 8px)`:`translate(${l}px, ${u}px) translate(-4px, -50%)`,e.style.opacity=String(C),e.style.visibility=C>.01?`visible`:`hidden`,t===`gabrovo`&&(e.firstElementChild.style.display=`none`)}),I.forEach(e=>{let t=M(+e.dataset.x,+e.dataset.y,q(300)*v.relief,H);e.style.transform=`translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px) translate(6px, -50%)`,e.style.opacity=String(C),e.style.visibility=C>.01?`visible`:`hidden`})}}let Z=!0,me=!0,he=``,Q=!0,ge=(e,t)=>{if(!Z||!me)return;let n=Math.min(t,50),r=Object.values(v).join(`,`);(Q||r!==he||v.spinW!==0)&&(he=r,Q=!1,de(n),c.render(h,_))};k.ticker.add(ge),new IntersectionObserver(e=>{me=e[0].isIntersecting,Q=!0},{rootMargin:`10% 0px`}).observe(a),document.addEventListener(`visibilitychange`,()=>{Z=!document.hidden}),addEventListener(`pagehide`,()=>{k.ticker.remove(ge),V?.dispose(),p.geo.dispose(),c.dispose()});let _e=n(`[data-head]`),ve=n(`[data-h1]`),ye=n(`[data-eyebrow]`),be=n(`[data-one]`),xe=n(`[data-mtitle]`),Se=n(`[data-attr]`),Ce=i(`[data-f]`),we=n(`[data-cue]`),$=null,Te=null;E(),new ResizeObserver(()=>{E(),Q=!0}).observe(a),(document.fonts?.ready??Promise.resolve()).then(()=>{Te=te.create(ve,{type:`lines`,mask:`lines`,linesClass:`k3__line`}),k.set(Te.lines,{yPercent:112}),k.set(_e,{autoAlpha:1}),k.set(ye,{opacity:0,y:14}),E(),De(),Ee()});function Ee(){let e=scrollY>8;$=k.timeline(),$.to(v,{intro:1,duration:3.4,ease:`power2.out`},0).to(ye,{opacity:1,y:0,duration:.9,ease:`expo.out`},.4).to(Te.lines,{yPercent:0,duration:1.1,stagger:.13,ease:`expo.out`},1.15).to(v,{labIntro:1,duration:.9,ease:`power2.out`},2.5).to(we,{opacity:1,duration:.8},3.2);let t=()=>{$?.progress(1),removeEventListener(`wheel`,t),removeEventListener(`touchstart`,t),removeEventListener(`keydown`,t),removeEventListener(`scroll`,t)};addEventListener(`wheel`,t,{passive:!0}),addEventListener(`touchstart`,t,{passive:!0}),addEventListener(`keydown`,t),addEventListener(`scroll`,t,{passive:!0}),location.search.includes(`k3debug`)&&(window.__k3={S:v,introTl:$}),e&&t(),$.eventCallback(`onComplete`,()=>{k.to(we,{opacity:0,duration:.6,delay:4})})}function De(){k.set([be,xe,Se],{autoAlpha:0}),k.set(Ce,{autoAlpha:0,y:26}),k.timeline({defaults:{ease:`none`},scrollTrigger:{trigger:a,start:`top top`,end:()=>`+=${Math.round(innerHeight*5.2)}`,scrub:.6,pin:!0,anticipatePin:1,invalidateOnRefresh:!0}}).to(_e,{autoAlpha:0,y:-40,duration:5,ease:`power2.in`},.5).to(v,{spinW:0,duration:8},0).to(v,{who:1,duration:4,ease:`power2.out`},3).to(v,{beat:3.5,duration:38,ease:e=>{if(e>=1)return 1;let t=e*3,n=Math.floor(t),r=t-n;return(n+(r<.3?0:r>.7?1:O((r-.3)/.4)))/3}},7).to(v,{loose:1,duration:32,ease:`power1.inOut`},8).to(v,{who:0,duration:3},43).to(v,{labOut:1,duration:3},44).to(v,{tight:1,duration:9,ease:`power2.inOut`},46).to(v,{hx:1,lean:0,pitch:0,duration:14,ease:`power2.inOut`},46).to(v,{fold:1,duration:14,ease:`power1.inOut`},52).fromTo(be,{autoAlpha:0,y:34},{autoAlpha:1,y:0,duration:5,ease:`power2.out`},49).to(v,{logoShow:1,duration:3,ease:`power1.inOut`},66).to(v,{alpha:0,duration:1.5},69).to(v,{toC:1,duration:.01},70.6).to(be,{autoAlpha:0,y:-24,duration:2.5,ease:`power2.in`},68.5).to(v,{lockup:1,duration:8,ease:`power2.inOut`},71).to(v,{marker:1,duration:8,ease:`power2.inOut`},72).to(v,{plateUp:1,duration:11,ease:`power2.out`},79).to(v,{relief:1,duration:9,ease:`power2.inOut`},82).to(v,{land:1,duration:3,ease:`bounce.out`},88).to(v,{alpha:1,duration:.8},87.5).to(v,{draw:1,duration:10,ease:`power1.inOut`},88).to(v,{clock:1,duration:3},86).to(xe,{autoAlpha:1,duration:4},90).to(Ce,{autoAlpha:1,y:0,duration:3,stagger:1,ease:`power2.out`},89).to(v,{mapLab:1,duration:5},92).to(Se,{autoAlpha:1,duration:3},95).set({},{},100)}}