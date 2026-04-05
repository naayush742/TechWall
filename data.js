

const wallEmojis = [
  {e:'🐍',c:'wc-cpu',l:'Python'},{e:'⚛️',c:'wc-ram',l:'React'},{e:'🐧',c:'wc-key',l:'Linux'},
  {e:'🐳',c:'wc-hdd',l:'Docker'},{e:'☕',c:'wc-gpu',l:'Java'},{e:'🦀',c:'wc-cpu',l:'Rust'},
  {e:'💻',c:'wc-ram',l:'C++'},{e:'🌐',c:'wc-key',l:'HTML'},{e:'📦',c:'wc-hdd',l:'Node'},
  {e:'⚡',c:'wc-gpu',l:'Vite'},{e:'🔷',c:'wc-cpu',l:'Go'},{e:'🐘',c:'wc-ram',l:'PHP'},
  {e:'💎',c:'wc-key',l:'Ruby'},{e:'🔮',c:'wc-hdd',l:'Vue'},{e:'🌙',c:'wc-gpu',l:'Lua'},
  {e:'🦕',c:'wc-cpu',l:'Deno'},{e:'⚙️',c:'wc-ram',l:'Bash'},{e:'☁️',c:'wc-key',l:'AWS'},
  {e:'🔐',c:'wc-hdd',l:'Git'},{e:'📊',c:'wc-gpu',l:'SQL'},{e:'🎯',c:'wc-cpu',l:'TS'},
  {e:'🌿',c:'wc-ram',l:'Mongo'},{e:'🏃',c:'wc-key',l:'Swift'},{e:'🤖',c:'wc-hdd',l:'TF'},
  {e:'📡',c:'wc-gpu',l:'API'},{e:'🔬',c:'wc-cpu',l:'Sci'},{e:'🎮',c:'wc-ram',l:'Unity'},
  {e:'🔑',c:'wc-key',l:'Auth'},{e:'🌊',c:'wc-hdd',l:'K8s'},{e:'💡',c:'wc-gpu',l:'IDE'},
  {e:'🔧',c:'wc-cpu',l:'Tools'},{e:'🧩',c:'wc-ram',l:'Redux'},{e:'📱',c:'wc-key',l:'Flutter'},
  {e:'🟡',c:'wc-hdd',l:'JS'},{e:'🔵',c:'wc-gpu',l:'.NET'},{e:'🟣',c:'wc-cpu',l:'Scala'},
  {e:'⬛',c:'wc-ram',l:'Vercel'},{e:'🟦',c:'wc-key',l:'CSS'},{e:'🟩',c:'wc-hdd',l:'CLI'},
  {e:'🔶',c:'wc-gpu',l:'Svelte'},{e:'🔴',c:'wc-cpu',l:'Redis'},{e:'🎨',c:'wc-ram',l:'Figma'},
  {e:'🐹',c:'wc-key',l:'Go'},{e:'🍃',c:'wc-hdd',l:'Mongo'},{e:'🟠',c:'wc-gpu',l:'Ubuntu'},
  {e:'📡',c:'wc-gpu',l:'WiFi'},{e:'🦖',c:'wc-cpu',l:'Dino Game'},
  {e:'⬜',c:'wc-cpu',l:'Next'},{e:'🌈',c:'wc-ram',l:'GCP'},{e:'🔥',c:'wc-key',l:'Firebase'},
];

const techs = [
  // Page 1: Cloud Computing (cloud.html)
  {name:'One Drive',    icon:'☁️', type:'cloud',     c:'#0078d4', a:'rgba(0,120,212,.12)',  slug:'cloud#onedrive'},
  {name:'Docker',       icon:'🐳', type:'os',        c:'#2496ed', a:'rgba(36,150,237,.12)', slug:'cloud#docker'},
  {name:'Google Drive', icon:'📂', type:'cloud',     c:'#34a853', a:'rgba(52,168,83,.12)',  slug:'cloud#googledrive'},
  {name:'AWS',          icon:'☁️', type:'cloud',     c:'#ff9900', a:'rgba(255,153,0,.12)',  slug:'cloud#aws'},

  // Page 2: DBMS (dbms.html)
  {name:'Power BI',     icon:'📊', type:'db',        c:'#f2c811', a:'rgba(242,200,17,.12)', slug:'dbms#powerbi'},
  {name:'MySQL',        icon:'🐬', type:'db',        c:'#4479a1', a:'rgba(68,121,161,.12)', slug:'dbms#mysql'},
  {name:'MongoDB',      icon:'🍃', type:'db',        c:'#47a248', a:'rgba(71,162,72,.12)', slug:'dbms#mongodb'},

  // Page 3: Applications (apps.html)
  {name:'VS Code',      icon:'💙', type:'os',        c:'#007acc', a:'rgba(0,122,204,.12)',  slug:'apps#vscode'},
  {name:'GitHub',       icon:'🔐', type:'os',        c:'#ffffff', a:'rgba(255,255,255,.1)', slug:'apps#github'},

  // Page 4: Cyber Security (cyber.html)
  {name:'Kali Linux',   icon:'🐉', type:'os',        c:'#557cf2', a:'rgba(85,124,242,.12)', slug:'cyber#kali'},
  {name:'Encryption',   icon:'🔐', type:'os',        c:'#ffcc00', a:'rgba(255,204,0,.12)',  slug:'cyber#encryption'},
  {name:'Linux',        icon:'🐧', type:'os',        c:'#fcc624', a:'rgba(252,198,36,.12)', slug:'cyber#linux'},
  {name:'Bug Bounty',   icon:'🪲', type:'os',        c:'#ff4d4d', a:'rgba(255,77,77,.12)',  slug:'cyber#bugbounty'},
  {name:'Firewall',     icon:'🧱', type:'os',        c:'#e65100', a:'rgba(230,81,0,.12)',   slug:'cyber#firewall'},

  // Page 5: AI (ai.html)
  {name:'Gemini',       icon:'✨', type:'cloud',     c:'#8e75ff', a:'rgba(142,117,255,.12)',slug:'ai#gemini'},
  {name:'Google',       icon:'🌈', type:'cloud',     c:'#4285f4', a:'rgba(66,133,244,.12)', slug:'ai#google'},

  // Page 6: Big Data (bigdata.html)
  {name:'Kafka',        icon:'⚙️', type:'framework', c:'#ffffff', a:'rgba(255,255,255,.1)', slug:'bigdata#kafka'},
  {name:'Hadoop',       icon:'🐘', type:'framework', c:'#ffca28', a:'rgba(255,202,40,.12)', slug:'bigdata#hadoop'},

  // Page 7: Web Development (webdev.html)
  {name:'Go Lang',      icon:'🐹', type:'lang',      c:'#00acd7', a:'rgba(0,172,215,.12)',  slug:'webdev#go'},
  {name:'PHP',          icon:'🐘', type:'lang',      c:'#8892be', a:'rgba(136,146,190,.12)',slug:'webdev#php'},
  {name:'HTML',         icon:'🌐', type:'os',        c:'#e34f26', a:'rgba(227,79,38,.12)',  slug:'webdev#html'},
  {name:'CSS',          icon:'🟦', type:'os',        c:'#1572b6', a:'rgba(21,114,182,.12)', slug:'webdev#css'},
  {name:'JS',           icon:'🟡', type:'lang',      c:'#f7df1e', a:'rgba(247,223,30,.1)',  slug:'webdev#js'},
  {name:'Streamlit',    icon:'🚀', type:'framework', c:'#ff4b4b', a:'rgba(255,75,75,.1)',  slug:'webdev#streamlit'},

  // Page 8: Programming Language (prog.html)
  {name:'Binary',       icon:'🔢', type:'framework', c:'#00ff88', a:'rgba(0,255,136,.1)',  slug:'prog#binary'},
  {name:'Assembly',     icon:'📟', type:'lang',      c:'#6a8aaa', a:'rgba(106,138,170,.12)',slug:'prog#assembly'},
  {name:'Fortran',      icon:'📠', type:'lang',      c:'#734f96', a:'rgba(115,79,150,.12)', slug:'prog#fortran'},
  {name:'COBOL',        icon:'💼', type:'lang',      c:'#005a9c', a:'rgba(0,90,156,.12)',   slug:'prog#cobol'},
  {name:'C',            icon:'💻', type:'lang',      c:'#a8b9cc', a:'rgba(168,185,204,.15)',slug:'prog#c'},
  {name:'C++',          icon:'⚙️', type:'lang',      c:'#00599c', a:'rgba(0,89,156,.15)',   slug:'prog#cpp'},
  {name:'C#',           icon:'🔷', type:'lang',      c:'#239120', a:'rgba(35,145,32,.12)',  slug:'prog#csharp'},
  {name:'Python',       icon:'🐍', type:'lang',      c:'#3776ab', a:'rgba(55,118,171,.15)', slug:'prog#python'},

  // Page 9: WiFi (wifi.html)
  {name:'WiFi',         icon:'📡', type:'os',        c:'#00ff88', a:'rgba(0,255,136,.12)', slug:'wifi#history'},

  // Page 10: Dino Game (dino.html)
  {name:'Dino Game',    icon:'🦖', type:'os',        c:'#fcc624', a:'rgba(252,198,36,.12)', slug:'dino#origin'},
];

const students = [
  {name:'Mehak',          role:'Web Developer',       skill:'BCA 1st',     emoji:'💻', c:'#9b59ff', a:'rgba(155,89,255,0.07)'},
  {name:'Anushka',        role:'Component Sorter',    skill:'BCA 2nd',       emoji:'🔧', c:'#ffb84d', a:'rgba(255,184,77,0.07)'}, 
  {name:'Utkarsh',        role:'Lead Designer',       skill:'BCA 2nd',    emoji:'🧠', c:'#00ff88', a:'rgba(0,255,136,0.07)'},
  {name:'Deepak',         role:'Project Coordinator', skill:'BCA 2nd',     emoji:'🎯', c:'#00d4ff', a:'rgba(0,212,255,0.07)'},
  {name:'Kunal',          role:'PCB Artisan',         skill:'BCA 2nd',    emoji:'⚙️', c:'#ff6b2b', a:'rgba(255,107,43,0.07)'},
  {name:'Surjeet',        role:'Web Devloper',        skill:'Bsc.IT 2nd',  emoji:'🔩', c:'#00d4ff', a:'rgba(0,212,255,0.07)'},
  {name:'Devanshi ',      role:'Web Developer',       skill:'MCA 2nd',  emoji:'📝', c:'#ff6b2b', a:'rgba(255,107,43,0.07)'},
  {name:'Ayush',          role:'Web Developer',       skill:'MCA 2nd',    emoji:'🐍', c:'#3776ab', a:'rgba(55,118,171,0.1)'},
];

const guide = {
  name:'Ms. Divya Rawat', role:'Faculty Guide & Mentor',
  skill:'Assistant Professor', emoji:'🎓',
  c:'#ffb84d', a:'rgba(255,184,77,0.08)', isGuide:true,
};
