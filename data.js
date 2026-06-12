

const wallEmojis = [
  {i:'<img src="icon/Microsoft_OneDrive_Icon.png" class="ti ti-md">',c:'wc-hdd',l:'One Drive', d:'Microsoft\'s cloud storage service for file syncing and sharing.'},
  {i:'<img src="icon/docker.png" class="ti ti-md">',c:'wc-cpu',l:'Docker', d:'Platform for developing, shipping, and running applications in containers.'},
  {i:'<img src="icon/Google_Drive_Logo.png" class="ti ti-md">',c:'wc-hdd',l:'Google Drive', d:'Cloud-based file storage and synchronization service by Google.'},
  {i:'<img src="icon/aws.png" class="ti ti-md">',c:'wc-hdd',l:'AWS', d:'Comprehensive and widely used cloud platform from Amazon.'},
  {i:'<img src="icon/power bi.png" class="ti ti-md">',c:'wc-ram',l:'Power BI', d:'Business analytics service by Microsoft for data visualization.'},
  {i:'<img src="icon/mysql.png" class="ti ti-md">',c:'wc-ram',l:'MySQL', d:'The world\'s most popular open-source relational database.'},
  {i:'<img src="icon/mongo db.png" class="ti ti-md">',c:'wc-ram',l:'MongoDB', d:'A source-available cross-platform document-oriented database.'},
  {i:'<img src="icon/vs code.png" class="ti ti-md">',c:'wc-cpu',l:'VS Code', d:'A powerful, lightweight source code editor by Microsoft.'},
  {i:'<img src="icon/github.png" class="ti ti-md">',c:'wc-cpu',l:'GitHub', d:'World\'s largest platform for hosting and collaborating on code.'},
  {i:'<img src="icon/kali linux.png" class="ti ti-md">',c:'wc-cpu',l:'Kali Linux', d:'Advanced penetration testing and security auditing Linux distro.'},
  {i:'<img src="icon/encryption.png" class="ti ti-md">',c:'wc-cpu',l:'Encryption', d:'The process of encoding information to keep it secure.'},
  {i:'<img src="icon/linux.png" class="ti ti-md">',c:'wc-cpu',l:'Linux', d:'The open-source kernel powering servers, mobile, and desktop.'},
  {i:'<img src="icon/bugbounty.png" class="ti ti-md">',c:'wc-cpu',l:'Bug Bounty', d:'Rewards offered by companies for finding software vulnerabilities.'},
  {i:'<img src="icon/firewall.png" class="ti ti-md">',c:'wc-cpu',l:'Firewall', d:'Network security system that monitors and controls traffic.'},
  {i:'<img src="icon/gemini.png" class="ti ti-md">',c:'wc-hdd',l:'Gemini', d:'Google\'s most capable AI model for various creative tasks.'},
  {i:'<img src="icon/google.png" class="ti ti-md">',c:'wc-hdd',l:'Google', d:'The world\'s leading search engine and technology pioneer.'},
  {i:'<img src="icon/kafka.png" class="ti ti-md">',c:'wc-gpu',l:'Kafka', d:'Distributed event streaming platform for high-performance pipelines.'},
  {i:'<img src="icon/hadoop.png" class="ti ti-md">',c:'wc-gpu',l:'Hadoop', d:'Framework for distributed storage and processing of big data.'},
  {i:'<img src="icon/go.png" class="ti ti-md">',c:'wc-key',l:'Go Lang', d:'Statistically typed, compiled language designed at Google.'},
  {i:'<img src="icon/php.png" class="ti ti-md">',c:'wc-key',l:'PHP', d:'Popular general-purpose scripting language for web development.'},
  {i:'<img src="icon/html.png" class="ti ti-md">',c:'wc-cpu',l:'HTML', d:'Standard markup language for creating web pages.'},
  {i:'<img src="icon/css.png" class="ti ti-md">',c:'wc-cpu',l:'CSS', d:'Style sheet language used for describing the presentation of web pages.'},
  {i:'<img src="icon/js.png" class="ti ti-md">',c:'wc-key',l:'JS', d:'The programming language of the web for interactive experiences.'},
  {i:'<img src="icon/streamlit.png" class="ti ti-md">',c:'wc-gpu',l:'Streamlit', d:'Open-source Python library to create and share custom web apps.'},
  {i:'<img src="icon/binary.png" class="ti ti-md">',c:'wc-gpu',l:'Binary', d:'Base-2 numeral system used internally by almost all computers.'},
  {i:'<img src="icon/assembly.png" class="ti ti-md">',c:'wc-key',l:'Assembly', d:'Low-level programming language closely related to machine code.'},
  {i:'<img src="icon/fortran.png" class="ti ti-md">',c:'wc-key',l:'Fortran', d:'A general-purpose, compiled imperative programming language.'},
  {i:'<img src="icon/cobol.png" class="ti ti-md">',c:'wc-key',l:'COBOL', d:'Common Business-Oriented Language for business applications.'},
  {i:'<img src="icon/c.png" class="ti ti-md">',c:'wc-key',l:'C', d:'A powerful general-purpose programming language since 1972.'},
  {i:'<img src="icon/cpp.png" class="ti ti-md">',c:'wc-key',l:'C++', d:'High-performance language extending C with object-oriented features.'},
  {i:'<img src="icon/c sharp.png" class="ti ti-md">',c:'wc-key',l:'C#', d:'Modern, object-oriented language developed by Microsoft.'},
  {i:'<img src="icon/python.png" class="ti ti-md">',c:'wc-key',l:'Python', d:'Versatile, easy-to-read language popular in AI and automation.'},
  {i:'<img src="icon/wifi.png" class="ti ti-md">',c:'wc-cpu',l:'WiFi', d:'Wireless networking technology for local area network access.'},
  {i:'<img src="icon/dinosaur-game-logo-png.png" class="ti ti-md">',c:'wc-cpu',l:'Dino Game', d:'The iconic \'No Internet\' Easter egg game in Google Chrome.'},
];

const techs = [
  // Page 1: Cloud Computing (cloud.html)
  {name:'One Drive',    icon:'<img src="icon/Microsoft_OneDrive_Icon.png" class="ti ti-xl">', type:'cloud',     c:'#0078d4', a:'rgba(0,120,212,.12)',  slug:'cloud#onedrive'},
  {name:'Docker',       icon:'<img src="icon/docker.png" class="ti ti-md">', type:'os',        c:'#2496ed', a:'rgba(36,150,237,.12)', slug:'cloud#docker'},
  {name:'Google Drive', icon:'<img src="icon/Google_Drive_Logo.png" class="ti ti-lg">', type:'cloud',     c:'#34a853', a:'rgba(52,168,83,.12)',  slug:'cloud#googledrive'},
  {name:'AWS',          icon:'<img src="icon/aws.png" class="ti ti-md">', type:'cloud',     c:'#ff9900', a:'rgba(255,153,0,.12)',  slug:'cloud#aws'},

  // Page 2: DBMS (dbms.html)
  {name:'Power BI',     icon:'<img src="icon/power bi.png" class="ti ti-md">', type:'db',        c:'#f2c811', a:'rgba(242,200,17,.12)', slug:'dbms#powerbi'},
  {name:'MySQL',        icon:'<img src="icon/mysql.png" class="ti ti-md">', type:'db',        c:'#4479a1', a:'rgba(68,121,161,.12)', slug:'dbms#mysql'},
  {name:'MongoDB',      icon:'<img src="icon/mongo db.png" class="ti ti-lg">', type:'db',        c:'#47a248', a:'rgba(71,162,72,.12)', slug:'dbms#mongodb'},

  // Page 3: Applications (apps.html)
  {name:'VS Code',      icon:'<img src="icon/vs code.png" class="ti ti-md">', type:'os',        c:'#007acc', a:'rgba(0,122,204,.12)',  slug:'apps#vscode'},
  {name:'GitHub',       icon:'<img src="icon/github.png" class="ti ti-md">', type:'os',        c:'#ffffff', a:'rgba(255,255,255,.1)', slug:'apps#github'},

  // Page 4: Cyber Security (cyber.html)
  {name:'Kali Linux',   icon:'<img src="icon/kali linux.png" class="ti ti-lg">', type:'os',        c:'#557cf2', a:'rgba(85,124,242,.12)', slug:'cyber#kali'},
  {name:'Encryption',   icon:'<img src="icon/encryption.png" class="ti ti-lg">', type:'os',        c:'#ffcc00', a:'rgba(255,204,0,.12)',  slug:'cyber#encryption'},
  {name:'Linux',        icon:'<img src="icon/linux.png" class="ti ti-md">', type:'os',        c:'#fcc624', a:'rgba(252,198,36,.12)', slug:'cyber#linux'},
  {name:'Bug Bounty',   icon:'<img src="icon/bugbounty.png" class="ti ti-lg">', type:'os',        c:'#ff4d4d', a:'rgba(255,77,77,.12)',  slug:'cyber#bugbounty'},
  {name:'Firewall',     icon:'<img src="icon/firewall.png" class="ti ti-md">', type:'os',        c:'#e65100', a:'rgba(230,81,0,.12)',   slug:'cyber#firewall'},

  // Page 5: AI (ai.html)
  {name:'Gemini',       icon:'<img src="icon/gemini.png" class="ti ti-lg">', type:'cloud',     c:'#8e75ff', a:'rgba(142,117,255,.12)',slug:'ai#gemini'},
  {name:'Google',       icon:'<img src="icon/google.png" class="ti ti-md">', type:'cloud',     c:'#4285f4', a:'rgba(66,133,244,.12)', slug:'ai#google'},

  // Page 6: Big Data (bigdata.html)
  {name:'Kafka',        icon:'<img src="icon/kafka.png" class="ti ti-lg">', type:'framework', c:'#ffffff', a:'rgba(255,255,255,.1)', slug:'bigdata#kafka'},
  {name:'Hadoop',       icon:'<img src="icon/hadoop.png" class="ti ti-lg">', type:'framework', c:'#ffca28', a:'rgba(255,202,40,.12)', slug:'bigdata#hadoop'},

  // Page 7: Web Development (webdev.html)
  {name:'Go Lang',      icon:'<img src="icon/go.png" class="ti ti-md">', type:'lang',      c:'#00acd7', a:'rgba(0,172,215,.12)',  slug:'webdev#go'},
  {name:'PHP',          icon:'<img src="icon/php.png" class="ti ti-md">', type:'lang',      c:'#8892be', a:'rgba(136,146,190,.12)',slug:'webdev#php'},
  {name:'HTML',         icon:'<img src="icon/html.png" class="ti ti-md">', type:'os',        c:'#e34f26', a:'rgba(227,79,38,.12)',  slug:'webdev#html'},
  {name:'CSS',          icon:'<img src="icon/css.png" class="ti ti-md">', type:'os',        c:'#1572b6', a:'rgba(21,114,182,.12)', slug:'webdev#css'},
  {name:'JS',           icon:'<img src="icon/js.png" class="ti ti-md">', type:'lang',      c:'#f7df1e', a:'rgba(247,223,30,.1)',  slug:'webdev#js'},
  {name:'Streamlit',    icon:'<img src="icon/streamlit.png" class="ti ti-lg">', type:'framework', c:'#ff4b4b', a:'rgba(255,75,75,.1)',  slug:'webdev#streamlit'},

  // Page 8: Programming Language (prog.html)
  {name:'Binary',       icon:'<img src="icon/binary.png" class="ti ti-lg">', type:'framework', c:'#00ff88', a:'rgba(0,255,136,.1)',  slug:'prog#binary'},
  {name:'Assembly',     icon:'<img src="icon/assembly.png" class="ti ti-lg">', type:'lang',      c:'#6a8aaa', a:'rgba(106,138,170,.12)',slug:'prog#assembly'},
  {name:'Fortran',      icon:'<img src="icon/fortran.png" class="ti ti-lg">', type:'lang',      c:'#734f96', a:'rgba(115,79,150,.12)', slug:'prog#fortran'},
  {name:'COBOL',        icon:'<img src="icon/cobol.png" class="ti ti-lg">', type:'lang',      c:'#005a9c', a:'rgba(0,90,156,.12)',   slug:'prog#cobol'},
  {name:'C',            icon:'<img src="icon/c.png" class="ti ti-md">', type:'lang',      c:'#a8b9cc', a:'rgba(168,185,204,.15)',slug:'prog#c'},
  {name:'C++',          icon:'<img src="icon/cpp.png" class="ti ti-md">', type:'lang',      c:'#00599c', a:'rgba(0,89,156,.15)',   slug:'prog#cpp'},
  {name:'C#',           icon:'<img src="icon/c sharp.png" class="ti ti-md">', type:'lang',      c:'#239120', a:'rgba(35,145,32,.12)',  slug:'prog#csharp'},
  {name:'Python',       icon:'<img src="icon/python.png" class="ti ti-md">', type:'lang',      c:'#3776ab', a:'rgba(55,118,171,.15)', slug:'prog#python'},

  // Page 9: WiFi (wifi.html)
  {name:'WiFi',         icon:'<img src="icon/wifi.png" class="ti ti-md">', type:'os',        c:'#00ff88', a:'rgba(0,255,136,.12)', slug:'wifi#history'},

  // Page 10: Dino Game (dino.html)
  {name:'Dino Game',    icon:'<img src="icon/dinosaur-game-logo-png.png" class="ti ti-lg">', type:'os',        c:'#fcc624', a:'rgba(252,198,36,.12)', slug:'dino#origin'},
];

const students = [
  {name:'Utkarsh Gupta',        role:'Lead Designer',       skill:'BCA student, USCS',    emoji:'<img src="img/utkarsh.jpeg" class="s-img">', c:'#00ff88', a:'rgba(0,255,136,0.07)', desc:'Created digital blueprints and mapped hardware components to iconic tech logos.'},
  {name:'Deepak Rawat',         role:'Project Coordinator', skill:'BCA student, USCS',     emoji:'<img src="img/deepak rawat.jpeg" class="s-img">', c:'#00d4ff', a:'rgba(0,212,255,0.07)', desc:'Synchronized team efforts and managed construction timelines across six months.'},
  {name:'Kunal Prajapati',          role:'PCB Artisan',         skill:'BCA student, USCS',    emoji:'<img src="img/kunal.jpeg" class="s-img">', c:'#ff6b2b', a:'rgba(255,107,43,0.07)', desc:'Specialized in intricate PCB arrangements to add texture and detail to the installation.'},
{name:'Anushka Rawat',        role:'Component Sorter',    skill:'BCA student, USCS',       emoji:'<img src="img/anushka rawat.jpeg" class="s-img">', c:'#ffb84d', a:'rgba(255,184,77,0.07)', desc:'Managed university e-waste collection and meticulously sorted components by type.'}, 
  {name:'Mehak Thapa',          role:'Hardware Assembler',  skill:'BCA student, USCS',     emoji:'<img src="img/mehak thapa.jpeg" class="s-img">', c:'#9b59ff', a:'rgba(155,89,255,0.07)', desc:'Focused on the precise physical mounting of components onto the wall panels.'}, 
  {name:'Ayush Negi',          role:'Web Developer',       skill:'MCA student, USCS',    emoji: '<img src="img/ayush negi.jpeg" class="s-img">', c:'#3776ab', a:'rgba(55,118,171,0.1)', desc:'Designed and developed this interactive platform to document the physical project.'},
];

const director = {
  name:'Prof. Dr. Sonal Sharma', role:'Director - USCS',
  skill:'Leadership & Vision', emoji:'<img src="img/Prof Dr Sonal Sharma.jpeg" class="s-img">',
  c:'#9b59ff', a:'rgba(155,89,255,0.08)', isDirector:true,
  desc:'Provided the visionary leadership and departmental support to make this installation possible.'
};

const guide = {
  name:'Ms. Divya Rawat', role:'Assistant Professor USCS',
  skill:'Faculty Guide & Mentor', emoji:'<img src="img/ms Divya Rawat.jpeg" class="s-img">',
  c:'#ffb84d', a:'rgba(255,184,77,0.08)', isGuide:true,
  desc:'Offered technical mentorship and academic guidance throughout the lifecycle of the project.'
};

const wasteParts = [
  { name: 'CPU Chip', icon: '🖥', type: 'art', desc: 'Silicon gold mine' },
  { name: 'Keyboard Key', icon: '⌨️', type: 'art', desc: 'Perfect for mosaics' },
  { name: 'Lithium Battery', icon: '🔋', type: 'toxic', desc: 'Highly reactive' },
  { name: 'Broken Screen', icon: '📱', type: 'toxic', desc: 'Lead & Mercury' },
  { name: 'Copper Wire', icon: '🔌', type: 'recycle', desc: '100% recyclable' },
  { name: 'Aluminum Casing', icon: '📦', type: 'recycle', desc: 'High scrap value' },
  { name: 'RAM Stick', icon: '💾', type: 'art', desc: 'Technical aesthetic' },
  { name: 'CR Monitor', icon: '📺', type: 'toxic', desc: 'Phosphor & Lead' },
  { name: 'Plastic Shell', icon: '🐚', type: 'recycle', desc: 'Standard polymer' },
  { name: 'Screws & Bolts', icon: '🔩', type: 'art', desc: 'Industrial detail' }
];
