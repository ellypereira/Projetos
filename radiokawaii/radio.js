  const playlist = [
    "musicas/EPICA - Code of Life (Live At The Symphonic Synergy).mp3",
    "musicas/MAN WITH A MISSION×milet「絆ノ奇跡」Music Video.mp3",
    "musicas/YOASOBI「アイドル」.mp3",
  ];

  let current = 0;
  const player = document.getElementById("player");
  player.src = playlist[current];
  player.load();
  player.play();

  player.addEventListener("ended", () => {
    current = (current + 1) % playlist.length; // repete quando chega ao fim
    player.src = playlist[current];
    player.load();
    player.play();
  });