import{A as e,C as t,D as n,E as r,O as i,_ as a,b as o,c as s,d as c,g as l,i as u,j as d,k as f,l as p,m,n as h,r as g,s as _,t as v,u as y,w as b,x,y as S}from"./three.module.DmhOvf5d.js";import{t as C}from"./gsap.Dm7UF3sG.js";import{n as w,t as T}from"./SplitText.BtFSBg_-.js";import{a as E,i as D,n as O,t as ee}from"./logoShapes.DxnGXufO.js";import{a as k,i as A,n as j,o as M,r as N,t as P}from"./gabrovo.meta.DrgN1JB0.js";var te=[{id:`business`,name:`Бизнес`,role:`Иновативни компании от мехатрониката, чистите технологии и ИКТ.`,color:D.yellow},{id:`science`,name:`Наука`,role:`Технически университет – Габрово.`,color:D.ink},{id:`administration`,name:`Администрация`,role:`Община Габрово и Областна администрация Габрово.`,color:D.blue},{id:`civil`,name:`Гражданско общество`,role:`Гражданите, училищата и организациите в региона, за които работим.`,color:D.red}].map(e=>e.color);s.enabled=!1;var ne=new _(`#fbf8f1`),F=(e,t)=>{let n=t*Math.PI/180;return[E.cx+e*Math.cos(n),E.cy-e*Math.sin(n)]},I=(e,t,n,r,i,a)=>Array.from({length:i},(o,s)=>{let c=t+r*s/(i-1);return{L:[e,c],R:[e+n,c],c:a}}),re=(e,t)=>Array.from({length:e},(n,r)=>{let i=87-80*Math.cos(Math.PI*r/(e-1)),a=Math.sqrt(Math.max(0,6400-(i-87)**2));return{L:[102,i],R:[115+a,i],c:t}}),L=(e,t)=>Array.from({length:e},(n,r)=>{let i=150+104*r/(e-1);return{L:[102,i],R:[153+57*(i-150)/104,i],c:t}}),R=(e,t,n,r)=>Array.from({length:n},(i,a)=>{let o=e+(t-e)*a/(n-1);return{L:F(E.r,o),R:F(E.R,o),c:r}}),z=[[{w:1,make:e=>I(O.R.stem.x,O.R.stem.y,O.R.stem.w,O.R.stem.h,e,D.yellow)}],[{w:160,make:e=>re(e,D.ink)},{w:104,make:e=>L(e,D.grey)},{w:190,make:e=>R(208,335,e,D.ink)}],[{w:1,make:e=>I(O.I.bar.x,O.I.bar.y,O.I.bar.w,O.I.bar.h,e,D.blue)}],[{w:1,make:e=>R(28,208,e,D.red)}]];function ie(e,t){let n=t-(e.length-1)*2,r=e.reduce((e,t)=>e+t.w,0),i=e.map(e=>Math.max(4,Math.round(n*e.w/r)));i[i.length-1]+=n-i.reduce((e,t)=>e+t,0);let a=[];return e.forEach((e,t)=>{let n=e.make(i[t]);if(t>0){let e=a[a.length-1];a.push({L:e.L,R:e.L,c:e.c}),a.push({L:n[0].L,R:n[0].L,c:n[0].c})}a.push(...n)}),a}var ae=`
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
`,B=`
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
`;function oe(t){let n=t,r=(n+1)*2*4,a=new Float32Array(r*3),s=new Float32Array(r*3),c=new Float32Array(r*3),l=new Float32Array(r*3),u=[],f=new _,p=z.map(e=>ie(e,n+1));for(let e=0;e<4;e++){let t=e*(n+1)*2;for(let r=0;r<=n;r++){for(let i=0;i<2;i++){let o=t+r*2+i;a.set([r/n,i?1:-1,e],o*3);let c=p[e][r],u=i?c.R:c.L;s.set([u[0],u[1],0],o*3),f.set(c.c),l.set([f.r,f.g,f.b],o*3)}if(r<n){let e=t+r*2;u.push(e,e+1,e+2,e+1,e+3,e+2)}}}let m=new g;m.setAttribute(`position`,new h(a,3)),m.setAttribute(`aB`,new h(s,3));let v=new h(c,3);m.setAttribute(`aC`,v),m.setAttribute(`aColB`,new h(l,3)),m.setIndex(u);let y={uIntro:{value:0},uRot:{value:0},uTurns:{value:2.4},uTwist:{value:1},uRho:{value:.14},uHW:{value:.03},uHelixScale:{value:10},uFold:{value:0},uStag:{value:.6},uLogoK:{value:.01},uRelief:{value:1},uToC:{value:0},uSkew:{value:.5},uHelixOffset:{value:new d},uHelixRot:{value:new S},uEdge:{value:new e(8,6)},uLogoOffset:{value:new e},uPlateM:{value:new o},uFw:{value:[0,0,0,0]},uDim:{value:[0,0,0,0]},uCol:{value:te.map(e=>new _(e))},uAlpha:{value:1},uDraw:{value:0},uCase:{value:0},uShadowK:{value:1},uPaper:{value:ne}},b=e=>new i({uniforms:y,vertexShader:ae,fragmentShader:B,side:2,transparent:!0,depthWrite:!e,depthTest:!e,defines:e?{SHADOW:1}:{}}),C=new x(m,b(!1)),w=new x(m,b(!0));return C.frustumCulled=w.frustumCulled=!1,w.renderOrder=2,C.renderOrder=3,w.material.vertexShader=ae.replace(`gl_Position = projectionMatrix * viewMatrix * vec4(pw, 1.0);`,`gl_Position = projectionMatrix * viewMatrix * vec4(pw + vec3(0.075, -0.1, -0.35), 1.0);`),{mesh:C,shadow:w,uniforms:y,geo:m,cAttr:v,N:n}}P.bbox,P.oblastBbox;var V=P.viewBox;`${V.width}${V.height}`,P.projection.cosLat,P.projection.unitsPerDegLat;var H={min:P.heightmap.elevationMin,max:P.heightmap.elevationMax},U={height1024:`/geo/gabrovo-height.png`,height512:`/geo/gabrovo-height-512.png`,hillshade:`/geo/gabrovo-hillshade.webp`,hillshadeOblast:`/geo/gabrovo-hillshade-oblast.webp`,hillshade900:`/geo/gabrovo-hillshade-900.webp`};P.heightmap.sizes[1024],P.heightmap.sizes[512];var W={scale:j.scale,tx:j.tx,ty:j.ty};`${W.tx}${W.ty}${W.scale}`,j.rectInBulgaria;var G=e=>k.find(t=>t.id===e),K=2.9,q=77.68,J=e=>(e-H.min)/q*K;async function se(e){let t=await(await fetch(e)).blob(),n=await createImageBitmap(t,{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=document.createElement(`canvas`);r.width=n.width,r.height=n.height;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(n,0,0);let a=i.getImageData(0,0,r.width,r.height).data,o=new Float32Array(r.width*r.height),s=H.max-H.min;for(let e=0;e<o.length;e++)o[e]=H.min+(a[e*4]*256+a[e*4+1])/65535*s;return{w:r.width,h:r.height,data:o}}function Y(e,t,n){let r=Math.min(Math.max(t/V.width*e.w-.5,0),e.w-1.001),i=Math.min(Math.max(n/V.height*e.h-.5,0),e.h-1.001),a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=e.data,u=e.w,d=l[o*u+a],f=l[o*u+a+1],p=l[(o+1)*u+a],m=l[(o+1)*u+a+1];return(d*(1-s)+f*s)*(1-c)+(p*(1-s)+m*s)*c}function X(e){let t=Math.round(e*V.height/V.width),n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=e/V.width;r.scale(i,i),r.lineJoin=`round`,r.lineCap=`round`,r.strokeStyle=`rgba(45,39,32,0.5)`,r.lineWidth=1.5,r.setLineDash([7,5]);for(let e of N)r.stroke(new Path2D(e.d));r.setLineDash([]),r.strokeStyle=`#3853a4`;for(let e of M)r.lineWidth=e.id===`yantra`?3.4:2.6,r.stroke(new Path2D(e.d));let o=new Path2D(A);r.strokeStyle=`rgba(251,248,241,0.9)`,r.lineWidth=7,r.stroke(o),r.strokeStyle=`#2d2720`,r.lineWidth=2.6,r.stroke(o);let s=new u(n);return s.flipY=!1,s.colorSpace=``,s.anisotropy=8,s.generateMipmaps=!0,s.minFilter=a,s}var ce=`
attribute float aElev;
uniform float uRelief;
varying vec2 vUv;
varying float vE;
void main(){
  vUv = vec2(position.x / ${V.width.toFixed(1)}, position.y / ${V.height.toFixed(1)});
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
  vUv = vec2(position.x / ${V.width.toFixed(1)}, position.y / ${V.height.toFixed(1)});
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,de=`
uniform sampler2D uHill;
uniform float uAlpha;
varying vec2 vUv;
void main(){
  float a = texture2D(uHill, vUv, 4.5).a;
  gl_FragColor = vec4(0.22, 0.14, 0.05, a * 0.26 * uAlpha);
}`;async function fe(e){let t=await se(e?U.height512:U.height1024),n=await new f().loadAsync(U.hillshadeOblast);n.flipY=!1,n.colorSpace=``,n.premultiplyAlpha=!1,n.anisotropy=8,n.needsUpdate=!0;let a=new Uint16Array(t.data.length);for(let e=0;e<a.length;e++)a[e]=y.toHalfFloat(t.data[e]);let o=new p(a,t.w,t.h,r,m);o.minFilter=l,o.magFilter=l,o.flipY=!1,o.colorSpace=``,o.needsUpdate=!0;let s=X(e?1024:2048),c=e?170:340,u=Math.round(c*V.height/V.width),d=new Float32Array((c+1)*(u+1)*3),_=new Float32Array((c+1)*(u+1));for(let e=0;e<=u;e++)for(let n=0;n<=c;n++){let r=n/c*V.width,i=e/u*V.height,a=Y(t,r,i),o=e*(c+1)+n;d.set([r,i,J(a)],o*3),_[o]=a}let v=[];for(let e=0;e<u;e++)for(let t=0;t<c;t++){let n=e*(c+1)+t,r=n+1,i=n+c+1,a=i+1;v.push(n,i,r,r,i,a)}let S=new g;S.setAttribute(`position`,new h(d,3)),S.setAttribute(`aElev`,new h(_,1)),S.setIndex(v);let C={uHill:{value:n},uHeight:{value:o},uOver:{value:s},uContour:{value:1},uAlpha:{value:1},uRelief:{value:1}},w=new i({uniforms:C,vertexShader:ce,fragmentShader:le,side:2,transparent:!0}),T=new x(S,w);T.matrixAutoUpdate=!1,T.frustumCulled=!1,T.renderOrder=1;let E=new b(V.width,V.height);E.translate(V.width/2,V.height/2,-30);let D=new i({uniforms:{uHill:{value:n},uAlpha:C.uAlpha},vertexShader:ue,fragmentShader:de,transparent:!0,depthWrite:!1,side:2}),O=new x(E,D);return O.matrixAutoUpdate=!1,O.frustumCulled=!1,O.renderOrder=0,{heights:t,mesh:T,shadow:O,uniforms:C,dispose(){S.dispose(),E.dispose(),n.dispose(),o.dispose(),s.dispose(),w.dispose(),D.dispose()}}}function pe(e,t,n,r){let i=M.find(e=>e.id===`yantra`).d.split(`M`).filter(Boolean).map(e=>{let t=e.match(/-?\d+\.?\d*/g).map(Number),n=[];for(let e=0;e<t.length;e+=2)n.push([t[e],t[e+1]]);return n}),a=[...i[3].slice().reverse(),...i[1].slice().reverse(),...i[0].slice().reverse()],o=document.createElement(`canvas`).getContext(`2d`),s=new Path2D(A),c=a.findIndex(e=>o.isPointInPath(s,e[0],e[1]));c<0&&(c=0),a=a.slice(c),a.push(n);for(let e=0;e<24;e++)a=a.map((e,t)=>{let n=a[Math.max(0,t-4)],r=a[Math.min(a.length-1,t+4)];return t===0||t===a.length-1?e:[(n[0]+e[0]*2+r[0])/4,(n[1]+e[1]*2+r[1])/4]});let l=[0];for(let e=1;e<a.length;e++)l.push(l[e-1]+Math.hypot(a[e][0]-a[e-1][0],a[e][1]-a[e-1][1]));let u=l[l.length-1],d=e=>{let t=e*u,n=1;for(;n<l.length-1&&l[n]<t;)n++;let r=(t-l[n-1])/Math.max(1e-6,l[n]-l[n-1]),i=a[n-1][0]+(a[n][0]-a[n-1][0])*r,o=a[n-1][1]+(a[n][1]-a[n-1][1])*r,s=a[n][0]-a[n-1][0],c=a[n][1]-a[n-1][1],d=Math.hypot(s,c)||1;return[i,o,-c/d,s/d]},f=[-24,-8,8,24],p=new Float32Array(4*(t+1)*2*3),m=0;for(let n=0;n<4;n++){let i=[];for(let e=0;e<=t;e++){let r=e/t,[a,o,s,c]=d(r),l=(1-r)**1.1,u=f[n]*l+Math.sin(r*9+n*1.7)*2*l;i.push([a+s*u,o+c*u])}for(let e=0;e<6;e++)i=i.map((e,n)=>n===0||n===t?e:[(i[n-1][0]+e[0]*2+i[n+1][0])/4,(i[n-1][1]+e[1]*2+i[n+1][1])/4]);for(let n=0;n<=t;n++){let a=i[Math.max(0,n-1)],o=i[Math.min(t,n+1)],s=o[0]-a[0],c=o[1]-a[1],l=Math.hypot(s,c)||1,u=-c/l,d=s/l;for(let t of[-1,1]){let a=i[n][0]+u*t*r,o=i[n][1]+d*t*r;p[m++]=a,p[m++]=o,p[m++]=J(Y(e,a,o))+7}}}return p}C.registerPlugin(w,T);var Z=document.querySelector(`[data-k3]`);Z&&me(Z);function me(e){let r=t=>e.querySelector(t),i=t=>[...e.querySelectorAll(t)],a=r(`[data-pin]`),s=r(`[data-canvas]`),l=document.documentElement,u;try{u=new v({canvas:s,antialias:!0,alpha:!0,powerPreference:`high-performance`})}catch{return f()}function f(){l.classList.remove(`k3-live`)}s.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),w.getAll().forEach(e=>e.kill()),C.ticker.remove(ge),f()});let p=innerWidth<820,m=oe(p?220:360),h=m.uniforms,g=new n;g.add(m.shadow,m.mesh);let _=new t(30,1,.1,200),y={intro:0,spinW:1,who:0,beat:.5,loose:0,tight:0,hx:0,lean:.2,pitch:.16,fold:0,alpha:1,logoShow:0,toC:0,plateUp:0,relief:0,lockup:0,marker:0,land:0,clock:0,draw:0,labIntro:0,labOut:0,mapLab:0,final:0},b={W:1,H:1,mobile:!1,helixC:{x:0,y:0},helixH:1,rho:.15,logoC:{x:0,y:0},logoK:1,lockX:0,lockY:0,lockK:.2,plateC:{x:0,y:0},plateW:1,tilt:.7,plateRise:1},x=i(`[data-letter]`),S=r(`[data-clock]`),E=e=>ee[e].split(` `).map(Number),D=r(`[data-slot]`),O=r(`[data-halo]`);function k(){let e=a.clientWidth,t=a.clientHeight;b.W=e,b.H=t,b.mobile=e<820,u.setPixelRatio(Math.min(window.devicePixelRatio||1,b.mobile?1.6:2)),u.setSize(e,t,!1),_.aspect=e/t;let n=t/100/2/Math.tan(30*Math.PI/360);if(_.position.set(0,0,n),_.updateProjectionMatrix(),_.updateMatrixWorld(!0),h.uEdge.value.set(e/200,t/200),b.mobile)b.helixC={x:e*.5,y:t*.33},b.helixH=t*.66,b.rho=.19,b.logoC={x:e*.5,y:t*.34},b.logoK=e*.94/600,b.lockX=16,b.lockY=86,b.lockK=.17,b.plateC={x:e*.5,y:t*.38},b.plateW=e*1.04,b.tilt=.5;else{b.helixC={x:e*.7,y:t*.5},b.helixH=t*1.18,b.rho=.15,b.logoC={x:e*.5,y:t*.4},b.logoK=Math.min(e*.6,t*1.55)/600;let n=a.getBoundingClientRect(),r=D.getBoundingClientRect();b.lockX=r.left-n.left,b.lockY=r.top-n.top,b.lockK=r.height/262;let i=e<1200;b.plateC={x:e*(i?.7:.675),y:t*.45},b.plateW=e*(i?.54:.6),b.tilt=.62}b.plateRise=t*1.05;let r=b.logoK;for(let e of[...x,S]){let t=e.dataset.letter??`C`,n=E(t);e.style.width=`${n[2]*r}px`,e.style.height=`${n[3]*r}px`}h.uLogoK.value=r/100,h.uLogoOffset.value.set((b.logoC.x-e/2)/100,(t/2-b.logoC.y)/100)}let A=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),j=e=>(e=A(e),e*e*(3-2*e)),M=(e,t,n)=>e+(t-e)*n,N=new d,P=(e,t,n,r)=>(N.set(e,t,n),r&&N.applyMatrix4(r),N.project(_),{x:(N.x*.5+.5)*b.W,y:(-N.y*.5+.5)*b.H}),te=e=>new d((e.x-b.W/2)/100,(b.H/2-e.y)/100,0),ne=i(`[data-beat]`),F=i(`[data-nm]`),I=r(`[data-who]`),re=i(`[data-lab]`),L=i(`[data-pl]`),R=i(`[data-riv]`);new Map(L.map(e=>[e.dataset.pl,e]));let z=e=>x.find(t=>t.dataset.letter===e),ie=z(`R`),ae=z(`I`),B=z(`C`),H=null,U=new o,W=new o;fe(p).then(e=>{H=e,e.mesh.visible=e.shadow.visible=!1,g.add(e.shadow,e.mesh);let t=G(`ric`),n=pe(e.heights,m.N,[t.x,t.y],p?4:3.2);m.cAttr.array.set(n),m.cAttr.needsUpdate=!0,Q=!0}).catch(e=>console.warn(`terrain failed`,e));let K=new o;function q(e,t){let n=(1-Y(t))*b.plateRise,r=M(b.tilt+.5,b.tilt,Y(t)),i=b.plateW/V.width/100;e.makeTranslation((b.plateC.x-b.W/2)/100,(b.H/2-b.plateC.y-n)/100,0),e.multiply(W.makeRotationX(-r)),e.multiply(W.makeScale(i,-i,i)),e.multiply(W.makeTranslation(-V.width/2,-V.height/2,0))}function se(){q(U,y.plateUp),q(K,1),h.uPlateM.value.copy(U),H&&(H.mesh.matrix.copy(U),H.shadow.matrix.copy(U),H.mesh.matrixWorldNeedsUpdate=!0,H.shadow.matrixWorldNeedsUpdate=!0,H.uniforms.uRelief.value=y.relief,H.uniforms.uContour.value=A((y.plateUp-.25)/.45),H.uniforms.uAlpha.value=A(y.plateUp*5),H.mesh.visible=H.shadow.visible=y.plateUp>.001)}let Y=e=>1-(1-A(e))**3,X=0,ce=new o,le=new c,ue=[.3,.42,.56,.68];function de(e){X+=e*14e-5;let t=2.5-.9*y.loose,n=1-.72*y.tight,r=b.rho*(1+.42*y.loose)*(1-.5*y.tight),i=Math.PI/2-(y.beat-.5)*(Math.PI/2)+X*y.spinW*6.2832,a=[0,1,2,3].map(e=>1-j((Math.abs(y.beat-(e+.5))-.28)/.34));h.uIntro.value=y.intro,h.uRot.value=i,h.uTurns.value=t,h.uTwist.value=n,h.uRho.value=r,h.uSkew.value=.5+.9*y.tight,h.uFold.value=y.fold,h.uToC.value=y.toC,h.uAlpha.value=y.alpha,h.uDraw.value=y.draw,h.uCase.value=y.toC*.9,h.uShadowK.value=M(1,.55,y.fold),h.uRelief.value=y.relief,h.uFw.value=a.map(e=>e*y.who),h.uDim.value=a.map(e=>(1-Math.max(e,.42))*y.who);let o=j(y.hx),s={x:M(b.helixC.x,b.logoC.x,o),y:M(b.helixC.y,b.logoC.y,o)},c=b.helixH*(1-.2*o)/100;h.uHelixScale.value=c,h.uHelixOffset.value.copy(te(s)),le.set(y.pitch,0,y.lean),ce.makeRotationFromEuler(le),h.uHelixRot.value.setFromMatrix4(ce),se();let l=y.labIntro*(1-y.labOut);re.forEach((e,a)=>{if(l<=.001){e.style.opacity=`0`,e.style.visibility=`hidden`;return}let o=1/(t*n),s=.5+(Math.PI/2-i-a*Math.PI/2)/(t*Math.PI*2*n),u=s+Math.round((ue[a]-s)/o)*o,f=(u-.5)*t*Math.PI*2*n+i+a*Math.PI/2,p=r*(1+.34*h.uFw.value[a]),m=new d(Math.cos(f)*p,u-.5,Math.sin(f)*p).multiplyScalar(c).applyMatrix3(h.uHelixRot.value).add(h.uHelixOffset.value),g=P(m.x,m.y,m.z),_=(1-j((Math.abs(u-.5)-.26)/.1))*(1-j((92-g.y)/60))*(1-j((g.y-(b.H-70))/50)),v=l*_;e.style.opacity=v.toFixed(3),e.style.visibility=v>.01?`visible`:`hidden`,e.style.transform=`translate(${(g.x+14).toFixed(1)}px, ${(g.y-14).toFixed(1)}px)`}),I.style.opacity=y.who.toFixed(3),F.forEach((e,t)=>{e.style.opacity=(.14+.86*a[t]).toFixed(3)}),ne.forEach((e,t)=>{let n=j((a[t]-.45)/.55),r=Math.sign(y.beat-(t+.5));e.style.opacity=n.toFixed(3),e.style.visibility=n>.01&&y.who>.01?`visible`:`hidden`,e.style.setProperty(`--dy`,`${(r*(1-n)*24).toFixed(1)}px`)});let u=b.logoK,f=b.logoC.x-300*u,p=b.logoC.y-131*u,m=j(y.lockup);for(let e of[ie,ae]){let t=E(e.dataset.letter),n=f+t[0]*u,r=p+t[1]*u,i=b.lockX+t[0]*b.lockK,a=b.lockY+t[1]*b.lockK,o=M(1,b.lockK/u,m);e.style.transform=`translate(${M(n,i,m).toFixed(2)}px, ${M(r,a,m).toFixed(2)}px) scale(${o.toFixed(4)})`,e.style.opacity=String(y.logoShow),e.style.visibility=y.logoShow>.002?`visible`:`hidden`}{let e=E(`C`),t=f+e[0]*u,n=p+e[1]*u;S.style.transform=`translate(${(b.lockX+e[0]*b.lockK).toFixed(2)}px, ${(b.lockY+e[1]*b.lockK).toFixed(2)}px) scale(${(b.lockK/u).toFixed(4)})`,S.style.opacity=String(y.clock),S.style.visibility=y.clock>.002?`visible`:`hidden`;let r=G(`ric`),i=P(r.x,r.y,J(r.elevation),K),a=b.mobile?40:54,o=a/(e[2]*u),s=(474-e[0])/e[2],c=(131-e[1])/e[3],l=y.marker,d=Math.sin(Math.PI*A(l))*b.H*.1,m=M(1,o,j(A(l*1.3)))*(1+.45*(1-A(y.land))*j(A((l-.9)*10))),h=j(A(l)),g=(1-A(y.land))*b.H*.05*j(A((l-.9)*10)),_=M(t+s*e[2]*u,i.x,h),v=M(n+c*e[3]*u,i.y,h)-d-g;B.style.transform=`translate(${(_-s*e[2]*u*m).toFixed(2)}px, ${(v-c*e[3]*u*m).toFixed(2)}px) scale(${m.toFixed(4)})`,B.style.opacity=String(y.logoShow),B.style.visibility=y.logoShow>.002?`visible`:`hidden`,O.style.setProperty(`--halo-t`,`translate(${i.x.toFixed(1)}px, ${i.y.toFixed(1)}px)`),O.classList.toggle(`is-on`,y.land>.98&&y.mapLab>.2);let x=y.mapLab;L.forEach(e=>{let t=e.dataset.pl,n=G(t);if(!n)return;let r=t===`ric`?i:P(n.x,n.y,J(n.elevation)*y.relief,y.plateUp>=1?K:U),o=e.classList.contains(`k3__pl--l`)?`l`:e.classList.contains(`k3__pl--t`)?`t`:e.classList.contains(`k3__pl--b`)?`b`:`r`,s=0,c=+(e.dataset.dy??0);t===`ric`&&(s=-(a/2+4),c=a/2-4),t===`gabrovo`&&(s=-(a/2+2),c=-a/2+8);let l=(r.x+s).toFixed(1),u=(r.y+c).toFixed(1);e.style.transform=o===`l`?`translate(${l}px, ${u}px) translate(calc(-100% + 5px), -50%)`:o===`t`?`translate(${l}px, ${u}px) translate(-50%, calc(-100% - 8px))`:o===`b`?`translate(${l}px, ${u}px) translate(-50%, 8px)`:`translate(${l}px, ${u}px) translate(-4px, -50%)`,e.style.opacity=String(x),e.style.visibility=x>.01?`visible`:`hidden`,t===`gabrovo`&&(e.firstElementChild.style.display=`none`)}),R.forEach(e=>{let t=P(+e.dataset.x,+e.dataset.y,J(300)*y.relief,U);e.style.transform=`translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px) translate(6px, -50%)`,e.style.opacity=String(x),e.style.visibility=x>.01?`visible`:`hidden`})}}let Z=!0,me=!0,he=``,Q=!0,ge=(e,t)=>{if(!Z||!me)return;let n=Math.min(t,50),r=Object.values(y).join(`,`);(Q||r!==he||y.spinW!==0)&&(he=r,Q=!1,de(n),u.render(g,_))};C.ticker.add(ge),new IntersectionObserver(e=>{me=e[0].isIntersecting,Q=!0},{rootMargin:`10% 0px`}).observe(a),document.addEventListener(`visibilitychange`,()=>{Z=!document.hidden}),addEventListener(`pagehide`,()=>{C.ticker.remove(ge),H?.dispose(),m.geo.dispose(),u.dispose()});let _e=r(`[data-head]`),ve=r(`[data-h1]`),ye=r(`[data-eyebrow]`),be=r(`[data-one]`),xe=r(`[data-mtitle]`),Se=r(`[data-attr]`),Ce=i(`[data-f]`),we=r(`[data-cue]`),$=null,Te=null;k(),new ResizeObserver(()=>{k(),Q=!0}).observe(a),(document.fonts?.ready??Promise.resolve()).then(()=>{Te=T.create(ve,{type:`lines`,mask:`lines`,linesClass:`k3__line`}),C.set(Te.lines,{yPercent:112}),C.set(_e,{autoAlpha:1}),C.set(ye,{opacity:0,y:14}),k(),De(),Ee()});function Ee(){let e=scrollY>8;$=C.timeline(),$.to(y,{intro:1,duration:3.4,ease:`power2.out`},0).to(ye,{opacity:1,y:0,duration:.9,ease:`expo.out`},.4).to(Te.lines,{yPercent:0,duration:1.1,stagger:.13,ease:`expo.out`},1.15).to(y,{labIntro:1,duration:.9,ease:`power2.out`},2.5).to(we,{opacity:1,duration:.8},3.2);let t=()=>{$?.progress(1),removeEventListener(`wheel`,t),removeEventListener(`touchstart`,t),removeEventListener(`keydown`,t),removeEventListener(`scroll`,t)};addEventListener(`wheel`,t,{passive:!0}),addEventListener(`touchstart`,t,{passive:!0}),addEventListener(`keydown`,t),addEventListener(`scroll`,t,{passive:!0}),location.search.includes(`k3debug`)&&(window.__k3={S:y,introTl:$}),e&&t(),$.eventCallback(`onComplete`,()=>{C.to(we,{opacity:0,duration:.6,delay:4})})}function De(){C.set([be,xe,Se],{autoAlpha:0}),C.set(Ce,{autoAlpha:0,y:26}),C.timeline({defaults:{ease:`none`},scrollTrigger:{trigger:a,start:`top top`,end:()=>`+=${Math.round(innerHeight*5.2)}`,scrub:.6,pin:!0,anticipatePin:1,invalidateOnRefresh:!0}}).to(_e,{autoAlpha:0,y:-40,duration:5,ease:`power2.in`},.5).to(y,{spinW:0,duration:8},0).to(y,{who:1,duration:4,ease:`power2.out`},3).to(y,{beat:3.5,duration:38,ease:e=>{if(e>=1)return 1;let t=e*3,n=Math.floor(t),r=t-n;return(n+(r<.3?0:r>.7?1:j((r-.3)/.4)))/3}},7).to(y,{loose:1,duration:32,ease:`power1.inOut`},8).to(y,{who:0,duration:3},43).to(y,{labOut:1,duration:3},44).to(y,{tight:1,duration:9,ease:`power2.inOut`},46).to(y,{hx:1,lean:0,pitch:0,duration:14,ease:`power2.inOut`},46).to(y,{fold:1,duration:14,ease:`power1.inOut`},52).fromTo(be,{autoAlpha:0,y:34},{autoAlpha:1,y:0,duration:5,ease:`power2.out`},49).to(y,{logoShow:1,duration:3,ease:`power1.inOut`},66).to(y,{alpha:0,duration:1.5},69).to(y,{toC:1,duration:.01},70.6).to(be,{autoAlpha:0,y:-24,duration:2.5,ease:`power2.in`},68.5).to(y,{lockup:1,duration:8,ease:`power2.inOut`},71).to(y,{marker:1,duration:8,ease:`power2.inOut`},72).to(y,{plateUp:1,duration:11,ease:`power2.out`},79).to(y,{relief:1,duration:9,ease:`power2.inOut`},82).to(y,{land:1,duration:3,ease:`bounce.out`},88).to(y,{alpha:1,duration:.8},87.5).to(y,{draw:1,duration:10,ease:`power1.inOut`},88).to(y,{clock:1,duration:3},86).to(xe,{autoAlpha:1,duration:4},90).to(Ce,{autoAlpha:1,y:0,duration:3,stagger:1,ease:`power2.out`},89).to(y,{mapLab:1,duration:5},92).to(Se,{autoAlpha:1,duration:3},95).set({},{},100)}}