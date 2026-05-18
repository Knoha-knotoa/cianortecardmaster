---
title: "Flesh and Blood para Lerdos"
category_label: "Guia"
summary: "Um guia em português simples, visual e bem-humorado para ensinar Flesh and Blood a jogadores iniciantes."
image: "/assets/img/guias/fab-para-lerdos/capa-orc-lerdo.webp"
author: "Cianorte Card Masters"
date: 2026-05-18
tags:
  - Guia
  - Flesh and Blood
  - Iniciantes
  - FAB para Lerdos
---

<style>


    .fab-lerdos-guide {
      --bg: #120d0a;
      --bg-2: #1a120e;
      --paper: #efe1c7;
      --paper-2: #e4cfab;
      --panel: rgba(250, 241, 223, 0.92);
      --panel-2: rgba(236, 221, 190, 0.92);
      --ink: #24160f;
      --muted: #6f5a46;
      --gold: #c89a3b;
      --gold-2: #8e6725;
      --bronze: #5a2f1e;
      --red: #8f2d1f;
      --red-2: #592017;
      --green: #3f6645;
      --blue: #294e70;
      --purple: #5d4676;
      --shadow: rgba(0, 0, 0, 0.34);
      --border: rgba(117, 78, 37, 0.42);
      --light-border: rgba(255, 236, 191, 0.28);
      --radius: 22px;
      --serif: Georgia, "Times New Roman", serif;
      --sans: Arial, Helvetica, sans-serif;
    }

    .fab-lerdos-guide, .fab-lerdos-guide * { box-sizing: border-box; }

    .fab-lerdos-guide { scroll-behavior: smooth; }

    .fab-lerdos-guide {
      margin: 0;
      color: var(--ink);
      font-family: var(--serif);
      line-height: 1.65;
      background:
        radial-gradient(circle at 50% -10%, rgba(209, 151, 51, 0.12), transparent 28%),
        radial-gradient(circle at top left, rgba(149, 51, 33, 0.12), transparent 24%),
        radial-gradient(circle at bottom right, rgba(35, 86, 53, 0.10), transparent 22%),
        linear-gradient(180deg, #211611 0%, var(--bg) 35%, #090706 100%);
    }
.fab-lerdos-guide .book {
      width: min(1080px, calc(100% - 24px));
      margin: 26px auto 44px;
      background:
        radial-gradient(circle at top right, rgba(255,255,255,0.28), transparent 24%),
        linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.02) 18%),
        linear-gradient(180deg, #f4e8d0 0%, var(--paper) 100%);
      border: 3px solid #2d1a11;
      border-radius: 30px;
      overflow: hidden;
      box-shadow:
        0 24px 90px rgba(0,0,0,0.48),
        inset 0 0 0 2px rgba(255,235,189,0.12),
        inset 0 12px 24px rgba(255,255,255,0.18);
      position: relative;
    }

    .fab-lerdos-guide .book::before {
      content: "";
      position: absolute;
      inset: 12px;
      border-radius: 22px;
      border: 1px solid rgba(103, 71, 39, 0.20);
      pointer-events: none;
      z-index: 1;
    }

    .fab-lerdos-guide .page {
      position: relative;
      z-index: 0;
      min-height: 900px;
      padding: 56px 68px;
      border-bottom: 1px solid rgba(93, 58, 27, 0.18);
      background:
        radial-gradient(circle at 20% 0%, rgba(255,255,255,0.16), transparent 22%),
        radial-gradient(circle at 88% 5%, rgba(200,154,59,0.10), transparent 15%),
        linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 25%),
        linear-gradient(180deg, rgba(231,212,178,0.42), rgba(244,232,208,0.18));
    }

    .fab-lerdos-guide .page::before {
      content: "";
      position: absolute;
      inset: 16px;
      border: 1px solid rgba(128, 92, 48, 0.18);
      border-radius: 18px;
      pointer-events: none;
      z-index: -1;
    }

    .fab-lerdos-guide .page::after {
      content: "";
      position: absolute;
      top: 28px;
      right: 28px;
      width: 132px;
      height: 132px;
      background:
        radial-gradient(circle, rgba(200,154,59,0.18) 0%, rgba(200,154,59,0.08) 34%, transparent 72%);
      opacity: 0.9;
      pointer-events: none;
      filter: blur(1px);
      z-index: -1;
      border-radius: 50%;
    }

    .fab-lerdos-guide .page:last-child { border-bottom: none; }

    .fab-lerdos-guide .cover {
      min-height: 980px;
      background:
        linear-gradient(rgba(17, 12, 10, 0.32), rgba(17, 12, 10, 0.34)),
        radial-gradient(circle at 50% 16%, rgba(255,219,145,0.14), rgba(180,69,49,0.14) 22%, transparent 60%),
        url('{{ '/assets/img/guias/fab-para-lerdos/capa-orc-lerdo.webp' | relative_url }}') center center / cover no-repeat;
      color: #fff5df;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 112px;
      overflow: hidden;
    }

    .fab-lerdos-guide .cover::before,
.fab-lerdos-guide .cover::after {
      content: "";
      position: absolute;
      inset: 22px;
      border: 2px solid rgba(255, 230, 174, 0.28);
      border-radius: 18px;
      pointer-events: none;
    }

    .fab-lerdos-guide .cover::after {
      inset: 38px;
      border-width: 1px;
      border-color: rgba(255, 230, 174, 0.16);
    }

    .fab-lerdos-guide .kicker {
      font-family: var(--sans);
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 14px;
      color: #ffd991;
      margin-bottom: 20px;
      font-weight: 800;
      text-shadow: 0 6px 18px rgba(0,0,0,0.75);
    }

    .fab-lerdos-guide h1,
.fab-lerdos-guide h2,
.fab-lerdos-guide h3,
.fab-lerdos-guide h4 {
      line-height: 1.1;
      margin: 0 0 18px;
      color: #2c160c;
    }

    .fab-lerdos-guide .cover h1 {
      color: #fff6df;
      font-size: clamp(48px, 8vw, 92px);
      text-transform: uppercase;
      letter-spacing: -0.05em;
      text-shadow: 0 10px 28px rgba(0,0,0,0.72);
      margin: 0 auto 16px;
      max-width: 800px;
    }

    .fab-lerdos-guide .cover .subtitle {
      max-width: 760px;
      margin: 0 auto 36px;
      font-size: 26px;
      color: #ffebbe;
      font-weight: 700;
      text-shadow: 0 6px 18px rgba(0,0,0,0.58);
    }

    .fab-lerdos-guide .cover .seal {
      display: inline-block;
      margin: 32px auto 0;
      padding: 14px 24px;
      border-radius: 999px;
      border: 1px solid rgba(255, 221, 144, 0.58);
      background: linear-gradient(180deg, rgba(17,11,8,0.58), rgba(17,11,8,0.36));
      color: #ffe3a1;
      font-family: var(--sans);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.10em;
      box-shadow: 0 12px 24px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(255,255,255,0.06);
    }

    .fab-lerdos-guide h2 {
      position: relative;
      font-size: 42px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: none;
    }

    .fab-lerdos-guide h2::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: min(260px, 38%);
      height: 4px;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--red) 0%, var(--gold) 72%, transparent 100%);
      box-shadow: 0 2px 8px rgba(143,45,31,0.18);
    }

    .fab-lerdos-guide h2::before {
      content: "✦";
      position: absolute;
      left: calc(min(260px, 38%) + 8px);
      bottom: -7px;
      color: var(--gold);
      font-size: 18px;
      line-height: 1;
    }

    .fab-lerdos-guide h3 {
      font-size: 30px;
      margin-top: 30px;
      color: #4a2819;
    }

    .fab-lerdos-guide h4 { font-size: 22px; }

    .fab-lerdos-guide p {
      margin: 0 0 16px;
      font-size: 18px;
    }

    .fab-lerdos-guide strong { color: #201109; }

    .fab-lerdos-guide .lead {
      font-size: 22px;
      font-weight: 700;
      color: #38251a;
      margin-bottom: 24px;
    }

    .fab-lerdos-guide .chapter-number {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      padding: 7px 12px 7px 0;
      font-family: var(--sans);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-weight: 900;
      color: var(--red);
    }

    .fab-lerdos-guide .chapter-number::before {
      content: "";
      width: 38px;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--gold), transparent);
    }

    .fab-lerdos-guide .toc {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 26px;
      counter-reset: item;
    }

    .fab-lerdos-guide .toc a {
      position: relative;
      display: grid;
      grid-template-columns: 62px 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 16px 18px;
      border-radius: 18px;
      text-decoration: none;
      color: var(--ink);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.36), rgba(255,255,255,0.12)),
        linear-gradient(135deg, rgba(234,216,184,0.80), rgba(250,241,223,0.68));
      border: 1px solid rgba(131, 93, 45, 0.30);
      box-shadow: 0 12px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.28);
      transition: transform .15s ease, box-shadow .15s ease;
      break-inside: avoid;
    }

    .fab-lerdos-guide .toc a:hover {
      transform: translateY(-1px);
      box-shadow: 0 16px 26px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.34);
    }

    .fab-lerdos-guide .toc a::before {
      counter-increment: item;
      content: counter(item, decimal-leading-zero);
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 30% 30%, #f8d685, #b07728 72%, #764716 100%);
      color: #2f180c;
      font-family: var(--sans);
      font-weight: 900;
      box-shadow: 0 8px 16px rgba(0,0,0,0.14), inset 0 1px 2px rgba(255,255,255,0.3);
    }

    .fab-lerdos-guide .toc span {
      color: var(--muted);
      font-size: 15px;
      font-family: var(--sans);
    }

    .fab-lerdos-guide .box,
.fab-lerdos-guide .card,
.fab-lerdos-guide .side-image,
.fab-lerdos-guide .playmat-figure,
.fab-lerdos-guide .chapter4-card,
.fab-lerdos-guide .pitch-color-figure,
.fab-lerdos-guide .combat-card-example,
.fab-lerdos-guide .image-strip figure,
.fab-lerdos-guide .chapter-banner,
.fab-lerdos-guide .full-figure,
.fab-lerdos-guide .step-card,
.fab-lerdos-guide .phase-card,
.fab-lerdos-guide .keyword-card,
.fab-lerdos-guide .class-card,
.fab-lerdos-guide .compact-list {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      border: 1px solid rgba(126, 88, 44, 0.34);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04)),
        linear-gradient(135deg, rgba(250,241,223,0.92), rgba(236,221,190,0.88));
      box-shadow:
        0 14px 26px rgba(0,0,0,0.08),
        inset 0 1px 0 rgba(255,255,255,0.35),
        inset 0 -10px 18px rgba(115, 78, 39, 0.05);
    }

    .fab-lerdos-guide .box::before,
.fab-lerdos-guide .card::before,
.fab-lerdos-guide .side-image::before,
.fab-lerdos-guide .playmat-figure::before,
.fab-lerdos-guide .chapter4-card::before,
.fab-lerdos-guide .pitch-color-figure::before,
.fab-lerdos-guide .combat-card-example::before,
.fab-lerdos-guide .image-strip figure::before,
.fab-lerdos-guide .chapter-banner::before,
.fab-lerdos-guide .full-figure::before,
.fab-lerdos-guide .step-card::before,
.fab-lerdos-guide .phase-card::before,
.fab-lerdos-guide .keyword-card::before,
.fab-lerdos-guide .class-card::before,
.fab-lerdos-guide .compact-list::before {
      content: "";
      position: absolute;
      inset: 10px;
      border-radius: 14px;
      border: 1px solid rgba(122, 84, 44, 0.14);
      pointer-events: none;
    }

    .fab-lerdos-guide .box {
      margin: 24px 0;
      padding: 22px 24px 20px;
      border-left: 10px solid var(--gold-2);
      break-inside: avoid;
    }

    .fab-lerdos-guide .box h4 {
      margin: 0 0 10px;
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.10em;
      color: #2e1a11;
    }

    .fab-lerdos-guide .box p:last-child,
.fab-lerdos-guide .box ul:last-child,
.fab-lerdos-guide .box ol:last-child { margin-bottom: 0; }

    .fab-lerdos-guide .humor {
      border-left-color: var(--red);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
        linear-gradient(135deg, rgba(247,223,207,0.98), rgba(238,199,183,0.94));
    }

    .fab-lerdos-guide .example {
      border-left-color: var(--green);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
        linear-gradient(135deg, rgba(228,239,216,0.98), rgba(207,224,190,0.94));
    }

    .fab-lerdos-guide .warning {
      border-left-color: var(--gold);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
        linear-gradient(135deg, rgba(248,237,197,0.98), rgba(235,218,159,0.96));
    }

    .fab-lerdos-guide .rules {
      border-left-color: var(--blue);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
        linear-gradient(135deg, rgba(220,232,242,0.98), rgba(198,218,233,0.94));
    }

    .fab-lerdos-guide .lore {
      border-left-color: var(--purple);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
        linear-gradient(135deg, rgba(231,223,240,0.98), rgba(215,203,230,0.94));
    }

    .fab-lerdos-guide .grid-2,
.fab-lerdos-guide .friendly-list,
.fab-lerdos-guide .keyword-grid,
.fab-lerdos-guide .class-grid,
.fab-lerdos-guide .phase-strip {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      margin: 24px 0;
    }

    .fab-lerdos-guide .phase-strip { grid-template-columns: repeat(4, minmax(0, 1fr)); }

    .fab-lerdos-guide .card {
      padding: 20px 22px;
      break-inside: avoid;
    }

    .fab-lerdos-guide .card h4 {
      font-size: 20px;
      margin-bottom: 10px;
      color: #472515;
    }

    .fab-lerdos-guide table {
      width: 100%;
      margin: 24px 0;
      border-collapse: separate;
      border-spacing: 0;
      font-size: 16px;
      border: 1px solid rgba(122,84,44,0.28);
      border-radius: 16px;
      overflow: hidden;
      background: rgba(255,255,255,0.22);
      box-shadow: 0 10px 18px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.2);
      break-inside: avoid;
    }

    .fab-lerdos-guide th,
.fab-lerdos-guide td {
      padding: 13px 14px;
      border-right: 1px solid rgba(122,84,44,0.22);
      border-bottom: 1px solid rgba(122,84,44,0.22);
      vertical-align: top;
    }

    .fab-lerdos-guide tr:last-child td { border-bottom: none; }
    .fab-lerdos-guide td:last-child,
.fab-lerdos-guide th:last-child { border-right: none; }

    .fab-lerdos-guide th {
      background:
        linear-gradient(180deg, #643421 0%, #49271b 100%);
      color: #ffeabf;
      font-family: var(--sans);
      font-size: 14px;
      letter-spacing: 0.03em;
      text-align: left;
      text-transform: none;
      box-shadow: inset 0 -1px 0 rgba(255,255,255,0.06);
    }

    .fab-lerdos-guide tbody tr:nth-child(even) td {
      background: rgba(255,255,255,0.16);
    }

    .fab-lerdos-guide tbody tr:nth-child(odd) td {
      background: rgba(255,247,232,0.12);
    }

    .fab-lerdos-guide ul,
.fab-lerdos-guide ol { font-size: 18px; margin-top: 0; }
    .fab-lerdos-guide li { margin-bottom: 9px; }

    .fab-lerdos-guide .mini-title {
      margin: 26px 0 8px;
      font-family: var(--sans);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--red);
    }

    .fab-lerdos-guide .fake-card {
      width: min(400px, 100%);
      margin: 30px auto;
      border-radius: 24px;
      padding: 18px;
      background: linear-gradient(150deg, #3c1a12, #d8b165 44%, #f6e8c5 45%, #76402b);
      border: 5px solid #25130c;
      box-shadow: 0 24px 36px rgba(0,0,0,0.32);
      break-inside: avoid;
    }

    .fab-lerdos-guide .fake-card-inner {
      background: #f5e8cc;
      border-radius: 16px;
      border: 2px solid #2b1710;
      overflow: hidden;
    }

    .fab-lerdos-guide .fake-card-top,
.fab-lerdos-guide .fake-card-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      font-family: var(--sans);
      font-weight: 900;
    }

    .fab-lerdos-guide .fake-card-top {
      background: #33180f;
      color: #ffe6b0;
    }

    .fab-lerdos-guide .fake-art {
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff3cf;
      font-size: 60px;
      background: radial-gradient(circle at 50% 35%, #ffdf74 0%, #c8482f 35%, #31160e 75%);
    }

    .fab-lerdos-guide .fake-card-text {
      padding: 14px;
      font-size: 15px;
      font-family: var(--sans);
    }

    .fab-lerdos-guide .fake-card-bottom {
      background: #ead2a8;
      color: #2b1710;
    }

    .fab-lerdos-guide .side-by-side,
.fab-lerdos-guide .chapter4-top,
.fab-lerdos-guide .combat-card-row,
.fab-lerdos-guide .image-strip,
.fab-lerdos-guide .chapter-banner,
.fab-lerdos-guide .step-grid {
      display: grid;
      gap: 22px;
      margin: 26px 0;
      align-items: center;
    }

    .fab-lerdos-guide .side-by-side { grid-template-columns: 1.35fr 0.85fr; }
    .fab-lerdos-guide .chapter4-top { grid-template-columns: 1.15fr 0.85fr; align-items: start; }
    .fab-lerdos-guide .combat-card-row { grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
    .fab-lerdos-guide .image-strip { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .fab-lerdos-guide .chapter-banner { grid-template-columns: 0.95fr 1.05fr; padding: 18px; }
    .fab-lerdos-guide .chapter-banner.reverse { grid-template-columns: 1.05fr 0.95fr; }
    .fab-lerdos-guide .step-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); counter-reset: steps; }

    .fab-lerdos-guide .side-text p:last-child,
.fab-lerdos-guide .side-text ul:last-child,
.fab-lerdos-guide .chapter-banner p:last-child { margin-bottom: 0; }

    .fab-lerdos-guide .side-image,
.fab-lerdos-guide .playmat-figure,
.fab-lerdos-guide .chapter4-card,
.fab-lerdos-guide .pitch-color-figure,
.fab-lerdos-guide .combat-card-example,
.fab-lerdos-guide .full-figure { 
      padding: 16px; 
      text-align: center; 
      break-inside: avoid;
    }

    .fab-lerdos-guide .side-image img,
.fab-lerdos-guide .playmat-figure img,
.fab-lerdos-guide .pitch-color-figure img,
.fab-lerdos-guide .chapter-banner img,
.fab-lerdos-guide .full-figure img,
.fab-lerdos-guide .chapter4-card img,
.fab-lerdos-guide .combat-card-example img,
.fab-lerdos-guide .image-strip img {
      width: 100%;
      display: block;
      border-radius: 14px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.24);
      border: 1px solid rgba(255,255,255,0.18);
    }

    .fab-lerdos-guide .side-image img { max-width: 320px; margin: 0 auto 10px; height: auto; }
    .fab-lerdos-guide .playmat-figure img,
.fab-lerdos-guide .pitch-color-figure img,
.fab-lerdos-guide .full-figure img,
.fab-lerdos-guide .chapter-banner img,
.fab-lerdos-guide .chapter4-card img { height: auto; }
    .fab-lerdos-guide .combat-card-example img { max-height: 390px; object-fit: contain; margin: 0 auto 12px; }
    .fab-lerdos-guide .image-strip img { height: 180px; object-fit: cover; object-position: center; margin-bottom: 10px; }

    .fab-lerdos-guide .chapter-banner .eyebrow {
      font-family: var(--sans);
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--red);
      margin-bottom: 10px;
    }

    .fab-lerdos-guide .chapter-banner h3 { margin-top: 0; font-size: 31px; }

    .fab-lerdos-guide .side-image figcaption,
.fab-lerdos-guide .playmat-figure figcaption,
.fab-lerdos-guide .chapter4-card figcaption,
.fab-lerdos-guide .pitch-color-figure figcaption,
.fab-lerdos-guide .combat-card-example p,
.fab-lerdos-guide .image-strip figcaption,
.fab-lerdos-guide .full-figure figcaption {
      font-family: var(--sans);
      font-size: 14px;
      line-height: 1.5;
      color: var(--muted);
    }

    .fab-lerdos-guide .combat-card-example h4 {
      margin: 0 0 8px;
      color: var(--red);
      font-family: var(--sans);
      font-size: 14px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .fab-lerdos-guide .badge-cloud,
.fab-lerdos-guide .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 18px 0 8px;
    }

    .fab-lerdos-guide .badge,
.fab-lerdos-guide .mini-tag,
.fab-lerdos-guide .keyword-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
      font-family: var(--sans);
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border: 1px solid rgba(114, 78, 39, 0.22);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.20);
    }

    .fab-lerdos-guide .badge {
      background: linear-gradient(180deg, rgba(255,250,240,0.9), rgba(232,216,184,0.9));
      color: #4a2819;
    }

    .fab-lerdos-guide .badge::before {
      content: "✦";
      color: var(--gold);
      font-size: 12px;
    }

    .fab-lerdos-guide .step-card {
      min-height: 118px;
      padding: 20px 18px 16px 64px;
    }

    .fab-lerdos-guide .step-card::before {
      counter-increment: steps;
      content: counter(steps);
      position: absolute;
      left: 18px;
      top: 18px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 30% 30%, #ffe18e, #c4852b 72%, #8b551d 100%);
      color: #341b0d;
      font-family: var(--sans);
      font-weight: 900;
      box-shadow: 0 8px 16px rgba(0,0,0,0.16);
      z-index: 2;
    }

    .fab-lerdos-guide .step-card h4,
.fab-lerdos-guide .phase-card h4,
.fab-lerdos-guide .keyword-card h4,
.fab-lerdos-guide .class-card h4 { color: #4a2819; }
    .fab-lerdos-guide .step-card h4 { margin: 0 0 8px; font-size: 20px; }
    .fab-lerdos-guide .step-card p { margin: 0; font-size: 16px; }

    .fab-lerdos-guide .friendly-list .card h4 { font-size: 18px; margin-bottom: 10px; }
    .fab-lerdos-guide .friendly-list ul,
.fab-lerdos-guide .mini-list { margin: 0; padding-left: 20px; font-size: 16px; }

    .fab-lerdos-guide .footer-note {
      margin-top: 34px;
      padding-top: 10px;
      border-top: 1px solid rgba(90,43,26,0.18);
      font-family: var(--sans);
      font-size: 12px;
      color: var(--muted);
    }

    .fab-lerdos-guide .print-button {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 30;
      border: 1px solid rgba(255,232,182,0.25);
      border-radius: 999px;
      padding: 14px 18px;
      font-family: var(--sans);
      font-weight: 900;
      letter-spacing: 0.05em;
      color: #ffefcc;
      background: linear-gradient(180deg, #7e2419, #5d1a12);
      box-shadow: 0 12px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12);
      cursor: pointer;
    }

    .fab-lerdos-guide .print-button:hover { filter: brightness(1.04); }

    .fab-lerdos-guide .small-note,
.fab-lerdos-guide .class-note {
      font-family: var(--sans);
      font-size: 14px;
      line-height: 1.5;
      color: var(--muted);
    }

    .fab-lerdos-guide .keyword-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

    .fab-lerdos-guide .keyword-card,
.fab-lerdos-guide .class-card,
.fab-lerdos-guide .phase-card {
      padding: 18px;
      box-shadow: 0 14px 26px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.30);
    }

    .fab-lerdos-guide .keyword-card::after,
.fab-lerdos-guide .class-card::after,
.fab-lerdos-guide .phase-card::after {
      content: "";
      position: absolute;
      right: -26px;
      top: -26px;
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200,154,59,0.22), transparent 68%);
      pointer-events: none;
    }

    .fab-lerdos-guide .keyword-card h4 { font-size: 24px; margin-bottom: 8px; }
    .fab-lerdos-guide .keyword-card p,
.fab-lerdos-guide .phase-card p,
.fab-lerdos-guide .class-card p { font-size: 15.5px; }
    .fab-lerdos-guide .keyword-card .small-note { display: block; margin-top: 6px; }

    .fab-lerdos-guide .keyword-chip {
      color: #fff;
      background: linear-gradient(180deg, #983126, #7f2419);
    }
    .fab-lerdos-guide .keyword-chip.label { background: linear-gradient(180deg, #6e5391, #594175); }
    .fab-lerdos-guide .keyword-chip.warning { background: linear-gradient(180deg, #d2aa4f, #b8872b); color: #321c0d; }
    .fab-lerdos-guide .keyword-chip.defense { background: linear-gradient(180deg, #3b668d, #2c5275); }
    .fab-lerdos-guide .keyword-chip.shadow { background: linear-gradient(180deg, #6e3028, #58241f); }
    .fab-lerdos-guide .keyword-chip.tech { background: linear-gradient(180deg, #4d7a54, #3c6442); }

    .fab-lerdos-guide .class-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

    .fab-lerdos-guide .class-card { border-left: 6px solid var(--gold); }
    .fab-lerdos-guide .class-card h4 { font-size: 22px; margin-bottom: 8px; }
    .fab-lerdos-guide .class-card p { margin-bottom: 8px; }

    .fab-lerdos-guide .mini-tag {
      padding: 5px 9px;
      background: linear-gradient(180deg, rgba(255,248,232,0.9), rgba(232,216,184,0.92));
      color: #53301f;
    }

    .fab-lerdos-guide .hero-roster {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      margin: 24px 0 30px;
      align-items: start;
    }

    .fab-lerdos-guide .hero-class {
      border-radius: 20px;
      border: 1px solid rgba(126, 88, 44, 0.34);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.03)),
        linear-gradient(135deg, rgba(250,241,223,0.94), rgba(236,221,190,0.90));
      box-shadow: 0 14px 26px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.30);
      overflow: hidden;
      break-inside: avoid;
    }

    .fab-lerdos-guide .hero-class summary {
      cursor: pointer;
      list-style: none;
      display: block;
      position: relative;
      min-height: 240px;
      padding: 0;
      color: #ffeabf;
      background: #1c110d;
      border-bottom: 1px solid rgba(255,235,189,0.16);
      overflow: hidden;
      isolation: isolate;
    }

    .fab-lerdos-guide .hero-class summary::-webkit-details-marker { display: none; }

    .fab-lerdos-guide .hero-class .hero-banner {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      background: #2a1710;
      z-index: 0;
    }

    .fab-lerdos-guide .hero-class .summary-copy {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: grid;
      gap: 8px;
      padding: 82px 18px 18px;
      background: linear-gradient(180deg, rgba(10,5,4,0.00) 0%, rgba(10,5,4,0.10) 22%, rgba(10,5,4,0.60) 52%, rgba(10,5,4,0.88) 100%);
    }

    .fab-lerdos-guide .hero-class summary span {
      display: block;
      font-size: 24px;
      font-weight: 900;
      color: #fff1cf;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding-right: 28px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }

    .fab-lerdos-guide .hero-class summary small {
      display: block;
      font-family: var(--sans);
      font-size: 13px;
      line-height: 1.45;
      color: rgba(255,239,210,0.92);
      padding-right: 28px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.7);
    }

    .fab-lerdos-guide .hero-class summary::after {
      content: "▼";
      position: absolute;
      right: 18px;
      top: 18px;
      font-family: var(--sans);
      color: var(--gold);
      font-size: 12px;
      line-height: 1;
      z-index: 2;
      text-shadow: 0 2px 6px rgba(0,0,0,0.7);
      background: rgba(20, 10, 8, 0.58);
      border: 1px solid rgba(255,235,189,0.18);
      border-radius: 999px;
      padding: 8px 9px;
      backdrop-filter: blur(2px);
    }

    .fab-lerdos-guide .hero-class[open] summary::after { content: "▲"; }

    .fab-lerdos-guide .hero-table-wrap {
      overflow-x: auto;
      padding: 14px 16px 18px;
    }

    .fab-lerdos-guide .hero-table {
      margin: 0;
      width: 100%;
      table-layout: fixed;
      font-size: 14.5px;
    }

    .fab-lerdos-guide .hero-table th:nth-child(1),
.fab-lerdos-guide .hero-table td:nth-child(1) { width: 26%; }

    .fab-lerdos-guide .hero-table th:nth-child(2),
.fab-lerdos-guide .hero-table td:nth-child(2) { width: 14%; }

    .fab-lerdos-guide .hero-table th:nth-child(3),
.fab-lerdos-guide .hero-table td:nth-child(3) { width: 60%; }

    .fab-lerdos-guide .hero-name strong {
      display: block;
      line-height: 1.25;
    }

    .fab-lerdos-guide .hero-stat {
      white-space: nowrap;
      font-weight: 700;
    }

    .fab-lerdos-guide .hero-name strong { color: #32180d; }

    .fab-lerdos-guide .hero-stat {
      white-space: nowrap;
      text-align: center;
      font-family: var(--sans);
      font-weight: 900;
      color: #4a2819;
    }

    .fab-lerdos-guide code {
      padding: 1px 5px;
      border-radius: 6px;
      background: rgba(70,38,24,0.10);
      border: 1px solid rgba(70,38,24,0.12);
      font-family: var(--sans);
      font-size: 0.92em;
    }

    .fab-lerdos-guide #cap10 { overflow: visible; }

    @media (max-width: 760px) {
      .fab-lerdos-guide .book { width: min(100%, calc(100% - 10px)); margin: 8px auto 20px; border-radius: 18px; }
      .fab-lerdos-guide .page { padding: 34px 22px; min-height: auto; }
      .fab-lerdos-guide .grid-2,
.fab-lerdos-guide .side-by-side,
.fab-lerdos-guide .chapter4-top,
.fab-lerdos-guide .combat-card-row,
.fab-lerdos-guide .image-strip,
.fab-lerdos-guide .chapter-banner,
.fab-lerdos-guide .chapter-banner.reverse,
.fab-lerdos-guide .step-grid,
.fab-lerdos-guide .friendly-list,
.fab-lerdos-guide .keyword-grid,
.fab-lerdos-guide .phase-strip,
.fab-lerdos-guide .class-grid,
.fab-lerdos-guide .hero-roster { grid-template-columns: 1fr; }
      .fab-lerdos-guide .phase-strip { gap: 14px; }
      .fab-lerdos-guide .side-image img { max-width: 260px; }
      .fab-lerdos-guide h2 { font-size: 34px; }
      .fab-lerdos-guide .cover { min-height: 88vh; padding-top: 72px; }
      .fab-lerdos-guide .cover h1 { font-size: 50px; }
      .fab-lerdos-guide .cover .subtitle { font-size: 22px; }
      .fab-lerdos-guide .toc a { grid-template-columns: 52px 1fr; }
      .fab-lerdos-guide .toc span { display: none; }
      .fab-lerdos-guide .hero-class summary { min-height: 220px; }
      .fab-lerdos-guide .hero-class summary { min-height: 200px; }
      .fab-lerdos-guide .hero-class summary::after { right: 16px; top: 16px; }
      .fab-lerdos-guide .print-button { display: none; }
    }

    @media print {
      @page { size: A4; margin: 11mm; }
      .fab-lerdos-guide { background: #fff; }
.fab-lerdos-guide .book { width: 100%; margin: 0; border: 0; box-shadow: none; }
      .fab-lerdos-guide .book::before { display: none; }
      .fab-lerdos-guide .page {
        min-height: auto;
        padding: 28px 34px;
        page-break-after: always;
        background: #fffaf2;
      }
      .fab-lerdos-guide .page::before,
.fab-lerdos-guide .page::after { display: none; }
      .fab-lerdos-guide .cover { min-height: 94vh; }
      .fab-lerdos-guide .hero-class summary::after { right: 16px; top: 16px; }
      .fab-lerdos-guide .print-button { display: none; }
      .fab-lerdos-guide a { color: inherit; }
    }

  

.fab-lerdos-guide {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 1px 0;
}
.fab-lerdos-guide .book {
  max-width: 100%;
}
.fab-lerdos-guide img {
  max-width: 100%;
  height: auto;
}

</style>

<div class="fab-lerdos-guide">
<button class="print-button" onclick="window.print()">Imprimir / PDF</button>

  <main class="book">
    <section class="page cover">
      <div class="kicker">Guia não oficial para sobreviver em Rathe</div>
      <h1>Flesh and Blood<br>para Lerdos</h1>
      <p class="subtitle">Como jogar FAB sem saber inglês, sem ler textão e sem inventar regra baseada na arte da carta.</p>
      <div class="seal">Versão HTML editável</div>
    </section>

    <section class="page" id="aviso">
      <div class="chapter-number">Antes da primeira pancada</div>
      <h2>Como usar este guia</h2>
      <p class="lead">Este guia é para quem nunca jogou TCG, para quem sabe jogar outros TCGs mas se perdeu em Rathe, e para o jogador clássico que olha a imagem, olha os números e diz: “entendi”.</p>

      <div class="chapter-banner reverse">
        <div>
          <div class="eyebrow">Manual de sobrevivência</div>
          <h3>O objetivo é simples: te manter rolando a página</h3>
          <p>Se o jogador não lê nem a carta, o guia também não pode ser um muro de texto. Então aqui a regra é outra: explicação curta, exemplo claro, zoeira estratégica e imagem suficiente para o cérebro não fugir no meio do caminho.</p>
          <p>Você não precisa decorar tudo. Precisa só seguir a ordem certa: entender a mesa, olhar a carta, pagar custo, atacar, defender e perceber quando o oponente está tentando te enrolar com texto pequeno.</p>
        </div>
        <img src="{{ '/assets/img/guias/fab-para-lerdos/jokenpo-carta.webp' | relative_url }}" alt="Carta Jo-Ken-Po usada como abertura visual do guia">
      </div>

      <div class="image-strip">
        <figure>
          <img src="{{ '/assets/img/guias/fab-para-lerdos/hero-intelecto.webp' | relative_url }}" alt="Heróis com intelecto 4 e 3">
          <figcaption><strong>Capítulo 2:</strong> você é o herói, e o intelecto mostra quantas cartas voltam para sua mão.</figcaption>
        </figure>
        <figure>
          <img src="{{ '/assets/img/guias/fab-para-lerdos/combat-chain.webp' | relative_url }}" alt="Mesa de Flesh and Blood">
          <figcaption><strong>Capítulo 3:</strong> onde fica cada coisa na mesa e por que arsenal não é cemitério.</figcaption>
        </figure>
        <figure>
          <img src="{{ '/assets/img/guias/fab-para-lerdos/nimblism-pitch-3-cores.webp' | relative_url }}" alt="Três cores da carta Nimblism">
          <figcaption><strong>Capítulo 5:</strong> a mesma carta nas três cores para entender por que vermelho bate e azul paga.</figcaption>
        </figure>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>Jogador de card game não lê carta. Ele faz arqueologia emocional: olha a arte, interpreta o número e inventa uma regra com a confiança de um advogado bêbado.</p>
      </div>

      <div class="box rules">
        <h4>Regra de sobrevivência</h4>
        <p>O guia explica o jogo em português simples. Para torneios, legalidade de heróis, cartas banidas e mudanças oficiais, sempre confira a fonte oficial mais recente. Rathe muda. O jogador que não lê continua igual.</p>
      </div>

      <p>O plano aqui é simples: cada capítulo prepara o próximo. Primeiro você entende o que está acontecendo na mesa. Depois aprende a olhar uma carta. Depois descobre por que sua mão cheia de carta vermelha não paga nada. Depois aprende a bater, defender, usar arsenal, escolher classe e não passar vergonha completa.</p>

      <div class="footer-note">Material não oficial, criado para ensino casual e comunidades de jogadores.</div>
    </section>

    <section class="page" id="sumario">
      <div class="chapter-number">Mapa da desgraça</div>
      <h2>Sumário</h2>

      <nav class="toc">
        <a href="#cap1">O que é TCG e por que tem gente gastando dinheiro com papel? <span>Começo absoluto</span></a>
        <a href="#cap2">O que é Flesh and Blood? <span>Você é o herói apanhando</span></a>
        <a href="#cap3">A mesa de jogo <span>Vida, mão, deck, arsenal e zonas</span></a>
        <a href="#cap4">Como ler uma carta sem fingir que leu <span>Cores, números e textão</span></a>
        <a href="#cap5">Pitch, custo e recursos <span>Rathe não aceita Pix emocional</span></a>
        <a href="#cap6">Ataque, defesa e cartas sem número <span>A flecha, o escudo e o “Juuudge!”</span></a>
        <a href="#cap7">Go Again e ponto de ação <span>Como transformar tapa em espancamento parcelado</span></a>
        <a href="#cap8">Keywords essenciais <span>O inglês que realmente importa</span></a>
        <a href="#cap9">Um turno guiado <span>Do pânico ao arsenal</span></a>
        <a href="#cap10">Classes e estilos <span>Escolha seu tipo favorito de problema</span></a>
        <a href="#cap11">Formatos para começar <span>Silver Age, Blitz, CC e formatos oficiais</span></a>
        <a href="#cap12">Plano de primeira partida <span>Dois lerdos entram, um aprende</span></a>
      </nav>
    </section>

    <section class="page" id="cap1">
      <div class="chapter-number">Capítulo 1</div>
      <h2>O que é TCG e por que tem gente gastando dinheiro com papel?</h2>
      <p class="lead">TCG significa Trading Card Game: um jogo de cartas colecionáveis. Ou, na tradução honesta, um jeito socialmente aceito de transformar papelão colorido em estratégia, amizade, dívida e discussão de regra.</p>

      <div class="box rules">
        <h4>Por que isso é diferente?</h4>
        <p>Em outros TCGs, às vezes você monta campo, invoca bicho, gira terreno, conta energia e finge que está no controle. Em <strong>Flesh and Blood</strong>, você controla um <strong>herói</strong>. A surra é direta, a decisão é sua e o erro também.</p>
        <p>Seu deck não é um álbum de carta bonita. É uma caixa de ferramentas: uma carta bate, outra defende, outra paga custo, outra atrapalha, outra salva sua pele e uma última te faz perguntar se você deveria ter lido melhor.</p>
      </div>

      <div class="box example">
        <h4>Exemplo simples</h4>
        <p>Imagine que seu deck é uma caixa de ferramentas. Algumas cartas são martelo, outras são chave de fenda, outras são gambiarra elétrica. O segredo é saber quando usar cada uma sem enfiar o dedo na tomada.</p>
      </div>

      <div class="friendly-list">
        <div class="card">
          <h4>O que todo TCG costuma ter</h4>
          <ul>
            <li>Um deck montado com cartas.</li>
            <li>Uma condição de vitória.</li>
            <li>Cartas que fazem coisas diferentes.</li>
            <li>Um amigo tentando dizer que “esse deck é casual”.</li>
          </ul>
        </div>
        <div class="card">
          <h4>O que você precisa saber agora</h4>
          <ul>
            <li>Você terá um deck.</li>
            <li>Você terá uma mão de cartas.</li>
            <li>Você usará cartas para atacar, defender e pagar custos.</li>
            <li>Você tentará reduzir a vida do oponente a zero.</li>
            <li>Você vai errar. Isso é parte do ritual.</li>
          </ul>
        </div>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>O iniciante pergunta: “preciso comprar muita carta?” A resposta honesta é: não para começar. Depois que gostar, seu cérebro inventa justificativas financeiras que fariam um contador chorar.</p>
      </div>

      <p>Agora que você já sabe que TCG é uma briga organizada com papel caro, vamos para Rathe.</p>
    </section>

    <section class="page" id="cap2">
      <div class="chapter-number">Capítulo 2</div>
      <h2>O que é Flesh and Blood?</h2>
      <p class="lead">Flesh and Blood é um duelo entre heróis. Você não invoca um monstrinho fofo para morrer por você. Você mesmo veste a armadura, pega a arma e vai apanhar de mago, ninja, pirata, assassino, brutamontes e gente que claramente não deveria ter acesso a laboratório.</p>

      <p>A partida representa uma luta. Cada jogador escolhe um herói, usa armas e equipamentos, compra cartas, ataca, defende e tenta sobreviver até o outro cair.</p>

      <div class="box lore">
        <h4>Clima de Rathe</h4>
        <p>Rathe é diverso: tem cidade do futuro, floresta mágica, brutalidade primitiva, pirataria, necromancia, anjos, assassinos de beco, bruxos, magos e gente que resolve diferença filosófica com martelo.</p>
      </div>

      <div class="box rules">
        <h4>Uma diferença importante</h4>

        <div class="side-by-side">
          <div class="side-text">
            <p>Em muitos card games, o jogador guarda carta na mão como se estivesse protegendo um tesouro, um documento falso e a última bolacha do pacote. Em <strong>Flesh and Blood</strong>, isso funciona diferente.</p>

            <p>A sua mão é a sua <strong>caixa de ferramentas do turno</strong>. Você usa cartas da mão para atacar, defender, pagar custos, montar sua jogada e, às vezes, cometer erros que pareciam geniais doze segundos antes.</p>

            <p>No fim do turno, você recompra cartas até o número de <strong>intelecto</strong> do seu herói.</p>

            <ul>
              <li>Se o herói tem <strong>4 de intelecto</strong>, você volta para <strong>4 cartas</strong>.</li>
              <li>Se o herói tem <strong>3 de intelecto</strong>, você volta para <strong>3 cartas</strong>.</li>
            </ul>

            <p>Isso muda bastante o jeito de jogar. Heróis com intelecto 4 costumam ter mais fôlego e opções. Heróis com intelecto 3 jogam mais apertados: cada carta importa mais, igual salário no fim do mês.</p>
          </div>

          <figure class="side-image">
            <img src="{{ '/assets/img/guias/fab-para-lerdos/hero-intelecto.webp' | relative_url }}" alt="Recorte de duas cartas de herói mostrando intelecto 4 e intelecto 3">
            <figcaption>
              O número no ícone azul mostra o intelecto do herói: quantas cartas você recompra no fim do turno.
            </figcaption>
          </figure>
        </div>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>Jogador novo vê o número e pensa: “legal, mais um detalhe”. Jogador que já apanhou algumas partidas olha e pensa: “ah, então era por isso que esse herói parecia que jogava apertado igual orçamento de fim de mês”.</p>
      </div>

      <div class="box warning">
        <h4>Erro de iniciante</h4>
        <p>Guardar carta demais achando que “vai precisar depois”. Em FAB, no fim do seu turno você compra de volta até o intelecto do herói. Então usar bem a mão é mais importante do que proteger suas cartinhas como se fossem filhotes.</p>
      </div>

      <p>Para entender essa mão que bate, defende e paga boleto, primeiro precisamos entender a mesa.</p>
    </section>

    <section class="page" id="cap3">
      <div class="chapter-number">Capítulo 3</div>
      <h2>A mesa de jogo</h2>
      <p class="lead">Antes de sair distribuindo espadada, hadouken, flechada, machadada e trauma psicológico, você precisa saber onde cada coisa fica na mesa. Porque nada transmite confiança como o jogador que coloca o arsenal no cemitério e chama isso de estratégia.</p>

      <div class="box rules">
        <h4>Visão geral da mesa</h4>
        <p>A imagem abaixo mostra uma organização básica da mesa em Flesh and Blood. Parece muita caixinha no começo, mas depois de algumas partidas você percebe que é só violência bem organizada.</p>
      </div>

      <figure class="playmat-figure">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/combat-chain.webp' | relative_url }}" alt="Diagrama da mesa de Flesh and Blood mostrando Combat Chain, Hero, Arsenal, Weapon, Head, Chest, Arms, Legs, Pitch, Deck, Graveyard e Banished">
        <figcaption>
          Organização básica da mesa. O centro é onde a treta acontece; as laterais são onde ficam suas ferramentas, restos mortais e decisões duvidosas.
        </figcaption>
      </figure>

      <table>
        <thead>
          <tr>
            <th>Área</th>
            <th>O que é</th>
            <th>Tradução para lerdos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Hero</strong></td>
            <td>Seu herói.</td>
            <td>Você mesmo, só que em papel e com mais chances de tomar machadada.</td>
          </tr>
          <tr>
            <td><strong>Arsenal</strong></td>
            <td>Carta guardada virada para baixo.</td>
            <td>Sua carta secreta… ou o erro que você vai descobrir no turno seguinte.</td>
          </tr>
          <tr>
            <td><strong>Weapon</strong></td>
            <td>Arma do herói.</td>
            <td>Ferramenta oficial para resolver divergências filosóficas com violência.</td>
          </tr>
          <tr>
            <td><strong>Head / Chest / Arms / Legs</strong></td>
            <td>Equipamentos.</td>
            <td>A roupa de guerra que impede você de apanhar pelado.</td>
          </tr>
          <tr>
            <td><strong>Deck</strong></td>
            <td>Seu monte de cartas.</td>
            <td>Seu estoque de violência, defesa e justificativas ruins.</td>
          </tr>
          <tr>
            <td><strong>Pitch</strong></td>
            <td>Área de recurso.</td>
            <td>Onde a carta vai quando você usa ela para pagar as contas.</td>
          </tr>
          <tr>
            <td><strong>Graveyard</strong></td>
            <td>Cemitério.</td>
            <td>O descanso das cartas que já cumpriram seu destino, ou falharam tentando.</td>
          </tr>
          <tr>
            <td><strong>Banished</strong></td>
            <td>Cartas banidas.</td>
            <td>O limbo esquisito onde algumas cartas vão parar para causar dúvida existencial.</td>
          </tr>
          <tr>
            <td><strong>Combat Chain</strong></td>
            <td>Área do combate atual.</td>
            <td>O palco oficial da pancadaria. Se algo está atacando ou defendendo agora, a treta passa por aqui.</td>
          </tr>
        </tbody>
      </table>

      <div class="grid-2">
        <div class="card">
          <h4>Herói</h4>
          <p>É você na forma de papel. Ele define vida, intelecto, classe, talento e geralmente o tipo de crime que seu deck pretende cometer.</p>
        </div>
        <div class="card">
          <h4>Deck</h4>
          <p>Seu monte de cartas. Dele você compra sua mão. Se o deck acabar, a partida pode virar uma novela triste de fadiga.</p>
        </div>
        <div class="card">
          <h4>Mão</h4>
          <p>Cartas que você usa para atacar, defender, pagar custos e tomar decisões ruins com convicção.</p>
        </div>
        <div class="card">
          <h4>Arsenal</h4>
          <p>Uma carta guardada virada para baixo. Parece simples. Até você colocar a carta errada ali e transformar seu futuro em prisão.</p>
        </div>
        <div class="card">
          <h4>Armas</h4>
          <p>Ficam na mesa e podem ser usadas para atacar. São a ferramenta de violência básica do herói.</p>
        </div>
        <div class="card">
          <h4>Equipamentos</h4>
          <p>Começam em campo: cabeça, peito, braços, pernas. Alguns bloqueiam, alguns têm efeitos, alguns quebram igual promessa de jogador aggro.</p>
        </div>
      </div>

      <div class="box example">
        <h4>Exemplo de visão da mesa</h4>
        <p>Você tem um herói, quatro cartas na mão, uma arma, alguns equipamentos e talvez uma carta no arsenal. O oponente também. Agora os dois fingem calma enquanto calculam como causar dano sem morrer de volta.</p>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>O jogador novo olha para a mesa e pensa: “Meu Deus, quanta caixinha.” O veterano olha e pensa: “Meu Deus, ele colocou o equipamento no graveyard.” Todo mundo sofre. É o ciclo da vida.</p>
      </div>

      <p>Agora que a mesa não parece mais um acidente de papelaria, vamos aprender a olhar a estrela do desastre: a carta.</p>
    </section>

    <section class="page" id="cap4">
      <div class="chapter-number">Capítulo 4</div>
      <h2>Como ler uma carta sem fingir que leu</h2>

      <p class="lead">Todo jogador de TCG passa por três fases: olha a imagem, olha os números e só lê o texto depois que perde. Este capítulo tenta reduzir a vergonha entre a fase dois e a fase três.</p>

      <figure class="chapter4-card">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/anatomia-carta-fantasia.webp' | relative_url }}" alt="Infográfico mostrando a anatomia de uma carta de fantasia, com setas para custo, pitch, texto, tipo, ataque e defesa">
        <figcaption>
          Use esta imagem como cola visual: primeiro olhe a cor e o custo, depois ataque/defesa, depois o tipo da carta e por fim o texto. Quem pula direto para a arte normalmente descobre o efeito só depois da derrota.
        </figcaption>
      </figure>

      <div class="chapter4-top">
        <div class="compact-list">
          <h3>A ordem correta para olhar a carta</h3>
          <ol>
            <li><strong>Cor:</strong> quanto ela gera de recurso quando você dá pitch.</li>
            <li><strong>Custo:</strong> quanto você paga para jogar.</li>
            <li><strong>Ataque:</strong> quanto dano pode causar.</li>
            <li><strong>Defesa:</strong> quanto bloqueia.</li>
            <li><strong>Tipo:</strong> ataque, ação, reação, instant, equipamento etc.</li>
            <li><strong>Keywords:</strong> palavras importantes como Go Again, Dominate e On Hit.</li>
            <li><strong>Texto completo:</strong> o chefão final do alfabetizado.</li>
          </ol>
        </div>

        <div class="compact-table">
          <table>
            <thead>
              <tr>
                <th>Cor</th>
                <th>Recurso</th>
                <th>Tradução para lerdos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vermelha</td>
                <td>1</td>
                <td>Bate mais forte, paga pouco. É a raiva.</td>
              </tr>
              <tr>
                <td>Amarela</td>
                <td>2</td>
                <td>Meio termo. A carta que ainda está se descobrindo.</td>
              </tr>
              <tr>
                <td>Azul</td>
                <td>3</td>
                <td>Paga as contas. O adulto responsável do deck.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>A arte ajuda? Ajuda. Se tem um cara com machado, provavelmente bate. Se tem um escudo, talvez defenda. Se tem um mago brilhando, provavelmente alguém vai perguntar: “em que janela isso resolve?”</p>
      </div>

      <div class="box rules">
        <h4>Como pensar olhando a carta</h4>
        <p>Primeiro você olha a <strong>cor</strong>, porque sem recurso não existe sonho. Depois olha <strong>custo</strong>, <strong>ataque</strong> e <strong>defesa</strong>. Aí você procura <strong>keywords</strong>. Só depois encara o texto completo como um cidadão alfabetizado.</p>
      </div>

      <div class="box example">
        <h4>Tradução prática</h4>
        <p>Se você bater o olho numa carta e já entender <strong>quanto ela paga</strong>, <strong>quanto custa</strong>, <strong>quanto bate</strong>, <strong>quanto bloqueia</strong> e se tem uma keyword importante, então você já deixou de ser um completo perdido e virou um iniciante funcional.</p>
      </div>

      <p>Agora que você sabe olhar a cor e interpretar os números sem depender totalmente do inglês, vem a tragédia financeira de Rathe: <strong>pagar custo</strong>.</p>
    </section>

    <section class="page" id="cap5">
      <div class="chapter-number">Capítulo 5</div>
      <h2>Pitch, custo e recursos</h2>
      <p class="lead">Nada em Rathe é de graça. Nem magia, nem machadada, nem levar uma surra com estilo. Para jogar cartas, você geralmente precisa pagar recursos. E é aqui que muitos iniciantes descobrem que uma mão cheia de carta bonita pode ser só um boleto parcelado em sofrimento.</p>

      <p><strong>Pitch</strong> é quando você usa uma carta da mão para gerar recursos. A carta vai para a zona de pitch e, no fim do turno, vai para o fundo do seu deck. Na prática de iniciante: você transforma uma carta em combustível para conseguir jogar outra.</p>

      <div class="box example">
        <h4>Exemplo</h4>
        <p>Você quer jogar uma carta que custa 2. Dá pitch em uma carta azul, que gera 3 recursos. Você paga 2, sobra 1. Parabéns: você pagou a conta e ainda sobrou troco para fazer besteira.</p>
      </div>

      <h3>A lei das cores: vermelho bate, azul paga</h3>
      <p>Em Flesh and Blood, muitas cartas aparecem em três versões: <strong>vermelha</strong>, <strong>amarela</strong> e <strong>azul</strong>. A diferença principal está em duas coisas: quanto recurso elas geram quando você dá pitch e quão fortes elas costumam ser quando você joga.</p>

      <figure class="pitch-color-figure">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/nimblism-pitch-3-cores.webp' | relative_url }}" alt="Três versões da carta Nimblism em vermelho, amarelo e azul, mostrando a diferença de pitch">
        <figcaption>
          A mesma carta pode aparecer nas três cores. Vermelha gera 1 recurso, amarela gera 2 e azul gera 3. A arte é quase igual; quem muda o jogo é a cor no topo e o símbolo de pitch.
        </figcaption>
      </figure>

      <figure class="full-figure">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/fluxo-recursos.webp' | relative_url }}" alt="Fluxo de recursos mostrando uma carta azul gerando 3 recursos, pagando um custo 2 e sobrando 1 recurso">
        <figcaption>
          Exemplo visual de conta de turno: uma carta azul gera 3 recursos, paga um ataque de custo 2 e ainda deixa 1 recurso sobrando. É exatamente esse raciocínio que evita o clássico “mão linda, turno horrível”.
        </figcaption>
      </figure>

      <table>
        <thead>
          <tr>
            <th>Cor</th>
            <th>Recurso gerado</th>
            <th>Força quando jogada</th>
            <th>Função mais comum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vermelha</strong></td>
            <td>1 recurso</td>
            <td>Geralmente mais forte</td>
            <td>Bater forte, finalizar, pressionar</td>
          </tr>
          <tr>
            <td><strong>Amarela</strong></td>
            <td>2 recursos</td>
            <td>Meio-termo</td>
            <td>Ajustar a conta, dar equilíbrio</td>
          </tr>
          <tr>
            <td><strong>Azul</strong></td>
            <td>3 recursos</td>
            <td>Geralmente mais fraca</td>
            <td>Pagar o turno, sustentar o deck</td>
          </tr>
        </tbody>
      </table>

      <p>Pense assim: a carta vermelha é o amigo que quer sair brigando. A carta azul é o amigo que trouxe dinheiro, água, documento e plano de fuga. Os dois são importantes, mas cada um resolve um tipo diferente de problema.</p>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>Carta vermelha é o brutamontes. Carta azul é o contador da firma. O brutamontes ganha a briga. O contador garante que a briga seja paga.</p>
      </div>

      <h3>Como saber se você consegue pagar o turno</h3>
      <p>Antes de sair jogando carta igual criança apertando todos os botões do controle, faça uma pergunta simples: <strong>quanto custa o meu plano?</strong></p>
      <p>Não olhe apenas para uma carta isolada. Olhe para o turno inteiro. Às vezes você quer jogar uma carta da mão, depois atacar com a arma, depois ativar uma habilidade. Tudo isso pode custar recurso.</p>

      <table>
        <thead>
          <tr>
            <th>Plano do turno</th>
            <th>Custo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jogar uma carta que custa 2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Atacar com a arma depois</td>
            <td>1</td>
          </tr>
          <tr>
            <td><strong>Total do plano</strong></td>
            <td><strong>3</strong></td>
          </tr>
        </tbody>
      </table>

      <p>Nesse exemplo, uma carta azul resolve tudo, porque ela gera 3 recursos. Uma carta vermelha gera só 1 recurso. Então, se sua mão está cheia de vermelhas, talvez ela pareça agressiva, mas na prática ela pode estar dura igual fim de mês.</p>

      <div class="box warning">
        <h4>Erro clássico do aggro emocionado</h4>
        <p>O jogador compra quatro cartas vermelhas e fala: “mão perfeita”. Três segundos depois descobre que não consegue pagar nada. Mão vermelha demais é igual churrasco sem carvão: a intenção era ótima, mas ninguém vai comer.</p>
      </div>

      <h3>Mão boa não é mão bonita. É mão que funciona.</h3>
      <p>Iniciante costuma olhar para a mão e pensar: “qual carta bate mais?”. Esse é um bom começo, mas não basta. O jogador esperto pergunta: <strong>qual é o melhor turno que eu consigo montar com essas cartas?</strong></p>
      <p>Uma mão boa precisa ter equilíbrio entre ameaça e pagamento. Não adianta ter três ataques maravilhosos se você só consegue pagar meio ataque e uma humilhação pública.</p>

      <table>
        <thead>
          <tr>
            <th>Tipo de mão</th>
            <th>O que geralmente acontece</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4 cartas vermelhas caras</td>
            <td>Bonita, agressiva e falida</td>
          </tr>
          <tr>
            <td>1 azul + 2 ataques bons</td>
            <td>Simples, honesta e perigosa</td>
          </tr>
          <tr>
            <td>2 azuis + cartas muito baratas</td>
            <td>Pode sobrar recurso sem uso</td>
          </tr>
          <tr>
            <td>1 carta forte + recurso certo</td>
            <td>Turno limpo, eficiente e sem drama</td>
          </tr>
        </tbody>
      </table>

      <div class="box humor">
        <h4>Tradução para lerdos</h4>
        <p>A mão perfeita não é a mão que parece mais brava. A mão perfeita é a que paga as próprias contas. Quatro vermelhas na mão podem parecer uma festa, mas às vezes são só quatro convidados e ninguém trouxe o refrigerante.</p>
      </div>

      <h3>Quantas cartas azuis eu coloco no deck?</h3>
      <p>Não existe número mágico. Se alguém disser que todo deck precisa exatamente de um número fixo de azuis, essa pessoa provavelmente também mede tempero com régua.</p>
      <p>A quantidade de azuis depende do seu herói, do custo das suas cartas, da arma que você usa e do que seu deck quer fazer. Mas dá para usar uma referência inicial.</p>

      <div class="grid-2">
        <div class="card">
          <h4>Referência para decks de 40 cartas</h4>
          <table>
            <thead>
              <tr>
                <th>Tipo de deck</th>
                <th>Azuis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Barato, com muitos custos 0 ou 1</td>
                <td>8 a 12</td>
              </tr>
              <tr>
                <td>Médio, com muitos custos 1 e 2</td>
                <td>12 a 16</td>
              </tr>
              <tr>
                <td>Pesado, com custos 2, 3 ou mais</td>
                <td>16 a 22</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card">
          <h4>Referência para decks de 60 cartas</h4>
          <table>
            <thead>
              <tr>
                <th>Tipo de deck</th>
                <th>Azuis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Barato ou muito agressivo</td>
                <td>12 a 18</td>
              </tr>
              <tr>
                <td>Médio</td>
                <td>18 a 24</td>
              </tr>
              <tr>
                <td>Pesado ou controlador</td>
                <td>24 a 33</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="box rules">
        <h4>Como saber se faltam azuis?</h4>
        <p>Se você compra mãos lindas, cheias de carta forte, mas não consegue pagar nada, provavelmente faltam azuis. Se todo turno sobra recurso e você não tem onde gastar, talvez tenha azul demais ou carta cara de menos.</p>
      </div>

      <h3>O poder da carta não está só no número de ataque</h3>
      <p>Agora vem uma parte importante: uma carta não é boa só porque bate muito. O valor real de uma carta depende do que ela entrega em troca do que você gastou.</p>
      <p>Uma carta que custa 3 e bate 6 pode parecer forte. Mas se você gastou uma azul inteira para pagar, usou duas cartas da mão e ainda não fez mais nada no turno, talvez esse ataque não tenha sido tão incrível assim.</p>

      <div class="box rules">
        <h4>Três perguntas para avaliar uma carta</h4>
        <ol>
          <li>Quanto ela custa?</li>
          <li>Quanto dano, defesa ou efeito ela entrega?</li>
          <li>Quantas cartas da minha mão eu precisei gastar para fazer isso acontecer?</li>
        </ol>
      </div>

      <div class="box example">
        <h4>Conta de lerdo, mas funciona</h4>
        <p>Se uma carta custa 0 e bate 4, ela é fácil de jogar e pressiona bem. Se uma carta custa 3 e bate 6, ela parece maior, mas exige mais recurso. A pergunta não é só “qual bate mais?”. A pergunta certa é: <strong>qual delas usa melhor minha mão?</strong></p>
      </div>

      <p>É por isso que jogadores mais experientes falam tanto sobre eficiência. Uma carta pode ter ataque alto, mas ser pesada demais. Outra pode bater menos, mas encaixar perfeitamente no turno. Em Flesh and Blood, carta boa não é apenas a carta forte. Carta boa é a carta que ajuda seu turno a funcionar.</p>

      <h3>Pitch não é lixeira. É planejamento.</h3>
      <p>Quando você dá pitch em uma carta, ela não desaparece. Ela vai para o fundo do deck no fim do turno. E isso muda tudo.</p>
      <p>No começo, você vai dar pitch só pensando: “preciso pagar essa carta agora”. Tudo bem. Todo mundo começa assim. Mas com o tempo você percebe que as cartas que você coloca no fundo do deck podem voltar mais tarde.</p>
      <p>Então o pitch deixa de ser apenas pagamento e começa a virar planejamento. Você pode estar montando, sem perceber, uma mão futura. Uma azul colocada perto de um ataque caro pode virar combustível para esse ataque quando o deck girar de novo.</p>

      <div class="box humor">
        <h4>O fundo do deck te observa</h4>
        <p>Iniciante dá pitch e esquece. Jogador esperto dá pitch e pensa: “quando isso voltar, que tipo de turno eu quero ter?”. Jogador paranoico olha para o fundo do deck como se estivesse lendo horóscopo de guerreiro endividado.</p>
      </div>

      <p>Esse assunto tem nome: <strong>pitch stack</strong>. Não precisa entrar em pânico agora. Você não precisa dominar isso para começar a jogar. Mas é bom saber que existe uma camada mais profunda no jogo: as cartas que você pitcha hoje podem construir o turno poderoso de amanhã.</p>

      <div class="box warning">
        <h4>Não faça isso</h4>
        <p>Não monte deck só com carta vermelha porque “bate mais”. Até psicopata agressivo precisa de orçamento. Um deck precisa bater, defender, pagar seus custos e funcionar com consistência.</p>
      </div>

      <h3>Resumo para não passar vergonha</h3>
      <ul>
        <li><strong>Vermelha</strong> geralmente bate mais, mas gera pouco recurso.</li>
        <li><strong>Azul</strong> geralmente bate menos, mas paga o turno.</li>
        <li><strong>Amarela</strong> fica no meio do caminho.</li>
        <li>Antes de jogar, calcule quanto custa seu plano do turno.</li>
        <li>Mão boa é a mão que funciona, não a mão que parece bonita.</li>
        <li>Pitch não é descarte: a carta volta para o fundo do deck.</li>
        <li>O jeito como você dá pitch pode preparar turnos futuros.</li>
      </ul>

      <p>No começo, entender pitch serve para pagar suas cartas. Depois, serve para montar turnos melhores. E mais para frente, quando falarmos de <strong>pitch stack</strong> e <strong>valor real da carta</strong>, você vai perceber que Flesh and Blood não é só bater no oponente: é bater no oponente enquanto administra uma pequena empresa de violência organizada.</p>

      <p>Pagou a carta? Ótimo. Agora vamos ver se ela bate ou se serve para impedir que você vire estatística.</p>
    </section>

    <section class="page" id="cap6">
      <div class="chapter-number">Capítulo 6</div>
      <h2>Ataque, defesa e cartas que te obrigam a ler</h2>
      <p class="lead">Ataque é a flecha da violência. Defesa é o escudo da sobrevivência. E existem cartas que não batem nem bloqueiam, mas ainda assim podem salvar sua pele — ou confundir um iniciante até ele levantar a mão e gritar: “Juuudge!”</p>

      <p>Depois de entender pitch e custo, o próximo passo é saber o que a carta faz na hora da briga. Algumas cartas são fáceis de reconhecer: têm ataque, têm defesa, mostram número, mostram escudo. Outras são traiçoeiras: parecem inofensivas, não têm ataque, não têm defesa, mas fazem algo importante no texto.</p>

      <div class="combat-card-row">
        <figure class="combat-card-example">
          <img src="{{ '/assets/img/guias/fab-para-lerdos/sink-below.webp' | relative_url }}" alt="Carta Sink Below, uma Defense Reaction vermelha com defesa 4">
          <h4>Sink Below</h4>
          <p><strong>Carta de defesa.</strong> Tem escudo 4 e é uma Defense Reaction. Ela entra para ajudar você a não virar tapete. Além disso, troca uma carta da mão se você quiser.</p>
        </figure>

        <figure class="combat-card-example">
          <img src="{{ '/assets/img/guias/fab-para-lerdos/scar-for-a-scar.webp' | relative_url }}" alt="Carta Scar for a Scar, uma Action Attack vermelha com ataque 4 e defesa 2">
          <h4>Scar for a Scar</h4>
          <p><strong>Carta de ataque.</strong> Tem ataque 4, defesa 2 e pode ganhar Go Again se você tiver menos vida que o oponente. É a carta do “estou apanhando, mas ainda corro atrás”.</p>
        </figure>

        <figure class="combat-card-example">
          <img src="{{ '/assets/img/guias/fab-para-lerdos/oasis-respite.webp' | relative_url }}" alt="Carta Oasis Respite, uma Instant vermelha que previne dano">
          <h4>Oasis Respite</h4>
          <p><strong>Não ataca e não defende.</strong> É uma Instant que previne dano. Esse tipo de carta você precisa ler, porque o valor dela está no texto, não nos números bonitinhos.</p>
        </figure>
      </div>

      <h3>Ataque: quando a carta quer machucar alguém</h3>
      <p>Se a carta tem valor de ataque, ela pode causar dano. Normalmente esse número aparece no canto inferior esquerdo, com o símbolo de ataque. A lógica básica é simples: você ataca, o oponente decide se bloqueia, e o dano que passar reduz a vida dele.</p>

      <div class="box example">
        <h4>Exemplo</h4>
        <p>Você ataca por 6. O oponente bloqueia 4. Passam 2 de dano. Simples. Até alguém usar reação, equipamento, prevenção, magia, pacto sombrio ou outra falta de respeito.</p>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>Jogador iniciante vê ataque 6 e pensa: “ganhei”. Jogador experiente vê ataque 6 e pergunta: “tem Go Again, On Hit, Dominate, reação, buff, desconto, imposto, parcelamento ou pegadinha?”.</p>
      </div>

      <h3>Defesa: quando a carta se joga na frente da surra</h3>
      <p>Se a carta tem escudo, ela pode bloquear. Você usa cartas da mão para defender ataques do oponente. Algumas cartas são especialmente boas nisso, como <strong>Sink Below</strong>: ela defende 4 e ainda pode melhorar sua mão.</p>

      <table>
        <thead><tr><th>Defesa</th><th>Leitura emocional</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>Essa carta não veio para apanhar por você.</td></tr>
          <tr><td>2</td><td>Ajuda, mas reclama.</td></tr>
          <tr><td>3</td><td>Bloqueio honesto. Trabalhador.</td></tr>
          <tr><td>4+</td><td>Muralha. Pessoa que leva guarda-chuva para guerra.</td></tr>
        </tbody>
      </table>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>Tem jogador que bloqueia tudo: hadouken, bomba, magia de fogo, flecha, dragão, martelada e o escambau. Ele fica ali, de escudo, esperando você gastar a alma. Depois pega o martelo e diz: “minha vez”.</p>
      </div>

      <h3>E quando a carta não ataca nem defende?</h3>
      <p>Aí mora o perigo. Cartas como <strong>Oasis Respite</strong> não têm ataque e não têm escudo, mas podem ser muito importantes. Ela não entra para bater nem para bloquear do jeito normal: ela previne dano por efeito de texto.</p>
      <p>Esse é o tipo de carta que ensina uma verdade cruel de TCG: às vezes o número não conta a história inteira. Quando a carta não tem ataque nem defesa, você é obrigado a ler. Sim, ler. Eu sei. É triste. Mas é melhor do que ser enganado por um adversário que fala rápido e aponta para a carta como se estivesse vendendo consórcio.</p>

      <div class="box warning">
        <h4>Levante a mão e chame o juiz</h4>
        <p>Se o adversário jogou uma carta que não ataca, não defende e você não entendeu o texto, não finja que entendeu. Pergunte. Em torneio, chame juiz. Levanta a mão e manda o clássico: <strong>“Juuudge!”</strong> Melhor parecer lerdo por 10 segundos do que perder a partida por vergonha.</p>
      </div>

      <h3>Três tipos de carta neste capítulo</h3>
      <table>
        <thead>
          <tr>
            <th>Tipo visual</th>
            <th>Exemplo</th>
            <th>Como pensar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tem ataque</td>
            <td>Scar for a Scar</td>
            <td>Quer causar dano. Veja custo, ataque, defesa e se tem Go Again ou On Hit.</td>
          </tr>
          <tr>
            <td>Tem defesa alta</td>
            <td>Sink Below</td>
            <td>Quer impedir dano. Veja quanto bloqueia e quando pode ser usada.</td>
          </tr>
          <tr>
            <td>Não tem ataque nem defesa</td>
            <td>Oasis Respite</td>
            <td>Leia o texto. O valor está no efeito, não no número.</td>
          </tr>
        </tbody>
      </table>

      <div class="box rules">
        <h4>Resumo de sobrevivência</h4>
        <p>Se tem ataque, pode bater. Se tem escudo, pode bloquear. Se não tem nenhum dos dois, leia com atenção, porque provavelmente a carta faz algo estranho, útil ou irritante. E se alguém tentar explicar rápido demais, respire fundo e chame o juiz.</p>
      </div>

      <p>Agora que você sabe bater, bloquear e desconfiar de carta sem número, falta entender por que alguns jogadores batem uma vez e param, enquanto outros fazem uma carreata de ataques. A culpa é do <strong>Go Again</strong>.</p>
    </section>

    <section class="page" id="cap7">
      <div class="chapter-number">Capítulo 7</div>
      <h2>Go Again e ponto de ação</h2>
      <p class="lead">No começo do turno, você normalmente tem um ponto de ação. Jogou uma ação? Gastou. Sem Go Again, acabou a festa. Com Go Again, a festa continua e alguém vai sair machucado.</p>

      <div class="box rules">
        <h4>A palavra mágica da irritação</h4>
        <p>Quando uma ação tem <strong>Go Again</strong>, ela não encerra seu turno sozinha. Depois que resolve, você ganha outro ponto de ação e continua a brincadeira. É assim que um ataque simples vira combo, sequência ou terrorismo emocional parcelado.</p>
        <p>Se você esquecer de olhar isso, pode acabar jogando como quem larga o controle no meio da fase final do chefe.</p>
      </div>

      <div class="box rules">
        <h4>Regra simples</h4>
        <p><strong>Go Again</strong> significa que, depois daquela ação resolver, você ganha 1 ponto de ação para continuar jogando.</p>
      </div>

      <div class="box example">
        <h4>Exemplo</h4>
        <p>Você joga um ataque com Go Again. Ele resolve. Você ganha outro ponto de ação. Agora pode jogar outra ação ou atacar com arma se tiver recurso e permissão. É assim que um tapa vira espancamento parcelado.</p>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>Go Again é a autorização oficial para ser irritante. O Ninja não quer causar 12 de dano de uma vez. Ele quer causar 1, 2, 1, 3, 1, 4 e ainda perguntar se você tem resposta.</p>
      </div>

      <h3>A pergunta que salva turno</h3>
      <p>Sempre que jogar uma carta, pergunte mentalmente: <strong>“Depois disso eu continuo?”</strong> Se a resposta for não, talvez você tenha acabado o turno antes de fazer a parte legal.</p>

      <figure class="full-figure">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/sequencia-combate.webp' | relative_url }}" alt="Infográfico mostrando um ponto de ação, ataque com Zero to Sixty, Go Again, novo ponto de ação, Zipper Hit e Overblast">
        <figcaption>
          O diagrama acima mostra o ponto central de Go Again: ele não joga a próxima carta de graça. Ele devolve o <strong>ponto de ação</strong>, permitindo continuar a sequência se você ainda tiver cartas e recursos.
        </figcaption>
      </figure>

      <p>Agora que você conhece a palavra mágica dos ataques em sequência, vamos aprender outras palavras que salvam você de ler contrato em inglês.</p>
    </section>

    <section class="page" id="cap8">
      <div class="chapter-number">Capítulo 8</div>
      <h2>Keywords essenciais: o inglês que realmente bate</h2>
      <p class="lead">Saber keyword é como aprender palavrão em outra língua: talvez você não entenda a frase inteira, mas já sabe quando vai dar problema.</p>

      <div class="chapter-banner reverse">
        <div>
          <div class="eyebrow">Leia o negrito antes do desespero</div>
          <h3>Keywords são o atalho mental do iniciante</h3>
          <p>Em FAB, uma palavra em negrito muda completamente o que a carta faz. Se você aprender primeiro as keywords mais comuns, já entende metade do perigo sem precisar traduzir cada linha igual contrato de banco.</p>
          <p>O segredo é simples: bateu o olho em keyword, pare e reconheça. Às vezes a carta parece inocente, mas a keyword diz “essa aqui vai te constranger em público”.</p>
        </div>
        <img src="{{ '/assets/img/guias/fab-para-lerdos/math-lady.webp' | relative_url }}" alt="Imagem humorística de pessoa pensativa cercada por fórmulas matemáticas, representando a confusão de ler várias keywords">
      </div>

      <div class="badge-cloud">
        <span class="badge">Go Again</span>
        <span class="badge">Dominate</span>
        <span class="badge">Combo</span>
        <span class="badge">Reprise</span>
        <span class="badge">Crush</span>
        <span class="badge">Boost</span>
        <span class="badge">Phantasm</span>
        <span class="badge">Arcane Barrier</span>
        <span class="badge">Ward</span>
        <span class="badge">Blood Debt</span>
      </div>

      <div class="box rules">
        <h4>Correção importante</h4>
        <p>Nas regras oficiais, keyword não é só “palavra bonita em negrito”. Existem <strong>ability keywords</strong> e <strong>label keywords</strong>. Então sim: <strong>Reprise</strong> é keyword, mas como <strong>label keyword</strong>. Já <strong>On Hit</strong> é linguagem de mesa muito usada, porém não aparece como keyword oficial na seção de keywords.</p>
      </div>

      <h3>As que você precisa reconhecer primeiro</h3>
      <div class="keyword-grid">
        <div class="keyword-card">
          <span class="keyword-chip">Ability keyword</span>
          <h4>Go Again</h4>
          <p>Depois que a ação resolve, você ganha 1 ponto de ação para continuar jogando.</p>
          <span class="small-note">Tradução para lerdos: “a pancadaria ainda não acabou”.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip warning">Ability keyword</span>
          <h4>Dominate</h4>
          <p>O ataque não pode ser defendido por mais de 1 carta da mão do oponente.</p>
          <span class="small-note">Tradução para lerdos: “você até bloqueia, mas vai bloquear triste”.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip tech">Ability keyword</span>
          <h4>Boost</h4>
          <p>Você bane o topo do deck; se a carta banida for Mechanologist, o ataque ganha Go Again.</p>
          <span class="small-note">É a ciência irresponsável transformando sucata em violência.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip">Ability keyword</span>
          <h4>Combo</h4>
          <p>A carta ganha efeito extra se o último ataque da combat chain foi exatamente o que ela pede.</p>
          <span class="small-note">Coreografia de surra: se a ordem vier certa, a carta fica melhor.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip defense">Ability keyword</span>
          <h4>Arcane Barrier</h4>
          <p>Você paga recursos para prevenir dano arcano.</p>
          <span class="small-note">Contra Wizard, isso deixa de ser detalhe e vira seguro de vida.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip defense">Ability keyword</span>
          <h4>Ward</h4>
          <p>Quando você tomaria dano, a carta ou token com Ward se quebra para prevenir aquele tanto.</p>
          <span class="small-note">É o guarda-costas pulando na frente da facada.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip shadow">Ability keyword</span>
          <h4>Blood Debt</h4>
          <p>Se a carta continuar banida no fim do seu turno, você perde vida.</p>
          <span class="small-note">O carnê sombrio: a carta já te ajudou, agora cobra juros.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip warning">Ability keyword</span>
          <h4>Phantasm</h4>
          <p>Se o ataque ou ilusão for defendido por um ataque não-Illusionist com 6 ou mais de poder, ele pode ser destruído.</p>
          <span class="small-note">A grande ameaça da ilusão é parecer muito forte até alguém encostar nela com vontade.</span>
        </div>
      </div>

      <h3>Label keywords: parecem só título, mas também importam</h3>
      <div class="keyword-grid">
        <div class="keyword-card">
          <span class="keyword-chip label">Label keyword</span>
          <h4>Reprise</h4>
          <p>Se o herói defensor defendeu com carta da mão naquele chain link, a carta ganha o efeito escrito depois de Reprise.</p>
          <span class="small-note">Warrior adora isso porque você bloquear já faz parte do plano dele.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip label">Label keyword</span>
          <h4>Crush</h4>
          <p>Se o ataque causar 4 ou mais de dano, o efeito de Crush dispara.</p>
          <span class="small-note">Guardian não bate por bater; bate para arruinar o turno seguinte também.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip label">Label keyword</span>
          <h4>Contract</h4>
          <p>Assassin recebe uma missão: banir certos tipos de carta do topo ou do cemitério do oponente para ganhar valor.</p>
          <span class="small-note">É assassinato com burocracia e meta de produtividade.</span>
        </div>
        <div class="keyword-card">
          <span class="keyword-chip label">Label keyword</span>
          <h4>Rupture</h4>
          <p>Fica melhor se for jogada em chain link 4 ou maior.</p>
          <span class="small-note">Primeiro você bagunça a mesa. Só depois vem a finalização dramática.</span>
        </div>
      </div>

      <div class="box warning">
        <h4>On Hit</h4>
        <p><strong>On Hit</strong> é o jeito que a comunidade fala de efeitos que acontecem quando um ataque acerta. Não trate como keyword oficial. Trate como <strong>alerta vermelho</strong>: se a carta faz algo ao causar dano, leia. Dano normal machuca vida; efeito de hit machuca o planejamento.</p>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>A imagem da matemática representa bem a cabeça do iniciante quando ele vê três keywords, duas linhas de texto e uma janela de instant. A boa notícia é que, depois de decorar umas dez palavras, a confusão já fica organizada.</p>
      </div>

      <p>Com as keywords na cabeça, já dá para sobreviver ao turno. Então vamos montar um turno guiado, com erro, correção e dignidade parcial.</p>
    </section>

    <section class="page" id="cap9">
      <div class="chapter-number">Capítulo 9</div>
      <h2>Um turno guiado</h2>
      <p class="lead">Este é o turno do iniciante funcional: ainda erra, mas erra com método.</p>

      <div class="chapter-banner">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/mao-cartas-batalha.webp' | relative_url }}" alt="Jogador segurando cartas em uma arena de fantasia, representando o planejamento do turno">
        <div>
          <div class="eyebrow">Planejamento antes do pânico</div>
          <h3>Turno bom começa na mão, não no impulso</h3>
          <p>Antes de baixar a primeira carta, olhe sua mão e monte um plano. Quanto custa? Quanto bloqueia? Tem Go Again? Quero guardar algo no arsenal? O jogador novo normalmente erra por ansiedade, não por maldade.</p>
          <p>Se você aprender a pensar o turno em blocos, começa a jogar FAB de forma muito mais limpa: início do turno, fase de ação, fim do turno e compra até o intelecto.</p>
        </div>
      </div>

      <h3>As fases do turno em português de gente normal</h3>
      <div class="phase-strip">
        <div class="phase-card">
          <h4>1. Início do turno</h4>
          <p>Resolva o topo da cadeia se houver algo pendente e cheque efeitos automáticos que acontecem no começo do turno.</p>
        </div>
        <div class="phase-card">
          <h4>2. Fase de ação</h4>
          <p>É aqui que mora quase todo o jogo: jogar ações, dar pitch, atacar, defender, reagir, usar instant e resolver a combat chain.</p>
        </div>
        <div class="phase-card">
          <h4>3. Fim do turno</h4>
          <p>Se o arsenal estiver vazio, você pode guardar 1 carta. As cartas da zona de pitch vão para o fundo do deck.</p>
        </div>
        <div class="phase-card">
          <h4>4. Comprar cartas</h4>
          <p>Você compra até voltar ao intelecto do seu herói. A mão do próximo turno nasce aqui.</p>
        </div>
      </div>

      <div class="step-grid">
        <div class="step-card"><h4>Olhe sua mão</h4><p>Não só a arte. A mão inteira. Respire. Você não está escolhendo figurinhas; está montando um turno.</p></div>
        <div class="step-card"><h4>Escolha um plano</h4><p>Vou bater? Defender depois? Guardar arsenal? Sem plano, sua mão vira só um monte de vontade.</p></div>
        <div class="step-card"><h4>Veja o custo</h4><p>Preciso pagar? Tenho carta azul ou amarela? Sem recurso, sonho não sai do papel.</p></div>
        <div class="step-card"><h4>Dê pitch se precisar</h4><p>Transforme carta em combustível e não em pânico.</p></div>
        <div class="step-card"><h4>Jogue sua ação</h4><p>Declare o que está fazendo como uma pessoa civilizada.</p></div>
        <div class="step-card"><h4>O oponente responde</h4><p>Ele talvez bloqueie, talvez apanhe, talvez leia a carta pela primeira vez.</p></div>
        <div class="step-card"><h4>Resolva dano e efeitos</h4><p>Principalmente efeito de hit. Não atropele esta parte, porque é aqui que nasce boa parte da desgraça.</p></div>
        <div class="step-card"><h4>Veja se tem Go Again</h4><p>Se tiver, continue. Se não tiver, pare de inventar combo inexistente.</p></div>
        <div class="step-card"><h4>Arsenal no fim</h4><p>Se sobrou carta boa para guardar, coloque virada para baixo.</p></div>
        <div class="step-card"><h4>Compre de volta</h4><p>Volte ao intelecto do herói. Fechou o turno? Parabéns, você já parece menos perdido.</p></div>
      </div>

      <div class="box example">
        <h4>Mini-história</h4>
        <p>João compra quatro vermelhas e sorri. Três segundos depois percebe que não paga nada. Maria compra duas azuis, uma vermelha e uma defesa. Ela faz menos pose, mas joga melhor. Moral: raiva sem recurso é só teatro.</p>
      </div>

      <div class="box humor">
        <h4>Zoeira da mesa</h4>
        <p>O primeiro turno do iniciante costuma ser: olha a mão, olha o oponente, olha a mão de novo, pergunta “posso fazer isso?”, faz errado, volta, faz certo, esquece arsenal. É normal. É o batismo.</p>
      </div>

      <figure class="full-figure">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/diagrama-estado-turno.webp' | relative_url }}" alt="Diagrama detalhado do estado do turno de Flesh and Blood mostrando início, fase de ação, cadeia, defesa e fim do turno">
        <figcaption>
          Este diagrama fecha o capítulo mostrando a estrutura completa do turno. Para o iniciante, o mais importante é lembrar a sequência macro: <strong>início do turno → fase de ação/combate → fim do turno → comprar até o intelecto</strong>. O resto vai ficando natural conforme você joga.
        </figcaption>
      </figure>

      <p>Depois de alguns turnos, você começa a perceber que nem todo deck quer vencer do mesmo jeito. Aí entram os estilos de jogo.</p>
    </section>

    <section class="page" id="cap10">
      <div class="chapter-number">Capítulo 10</div>
      <h2>Classes e estilos</h2>
      <p class="lead">Escolher classe em FAB é escolher o seu jeito favorito de causar problema. Tem classe que bate em sequência, classe que ganha no peso, classe que atrasa sua vida e classe que parece jogar outro jogo dentro do jogo.</p>

      <div class="chapter-banner reverse">
        <div>
          <div class="eyebrow">Cada classe briga de um jeito</div>
          <h3>Aprender a classe é mais útil do que decorar carta por carta</h3>
          <p>Quando você entende a identidade da classe, começa a reconhecer padrões. Guardian quer um grande turno. Ninja quer vários pequenos. Warrior transforma bloqueio em armadilha. Assassin gosta de fazer você jogar menos do que gostaria.</p>
          <p>Em português de boteco: antes de decorar nome de carta, aprenda <strong>qual é o plano do deck</strong>. Isso já evita metade dos erros de iniciante.</p>
        </div>
        <img src="{{ '/assets/img/guias/fab-para-lerdos/mesa-taverna.webp' | relative_url }}" alt="Mesa com vários jogadores de card game em cenário de fantasia, representando a variedade de classes e estilos de jogo em Flesh and Blood">
      </div>

      <h3>Estilos de jogo</h3>
      <table>
        <thead><tr><th>Estilo</th><th>Como vence</th><th>Quando costuma aparecer</th><th>Tradução para lerdos</th></tr></thead>
        <tbody>
          <tr><td>Aggro</td><td>Encurta a partida e troca vida por pressão.</td><td>Ninja, Brute, alguns Mechanologist.</td><td>“Se eu morrer, morri batendo.”</td></tr>
          <tr><td>Midrange</td><td>Ataca e defende bem conforme a mão e o matchup.</td><td>Guardian, Warrior, Ranger, vários decks “honestos”.</td><td>O adulto da mesa, ou pelo menos tenta.</td></tr>
          <tr><td>Control</td><td>Segura o jogo, nega valor e vence depois.</td><td>Guardian, Wizard, Assassin, alguns Illusionist.</td><td>Destrói sua esperança antes da sua vida.</td></tr>
          <tr><td>Combo</td><td>Junta peças e explode em um turno muito forte.</td><td>Runeblade, Wizard, Ninja, alguns decks de engine.</td><td>Apanha vários turnos dizendo “confia”.</td></tr>
          <tr><td>Fatigue / Value</td><td>Ganha no cansaço, na eficiência e no deck longo.</td><td>Guardian e listas mais defensivas.</td><td>Vencer por planilha, rancor e paciência.</td></tr>
        </tbody>
      </table>

      <figure class="full-figure">
        <img src="{{ '/assets/img/guias/fab-para-lerdos/heroi-cartas-classe.webp' | relative_url }}" alt="Herói de fantasia cercado por cartas vermelhas e roxas, representando classes, estilos e identidades de deck">
        <figcaption>
          A identidade da classe determina o tipo de carta, de recurso e de decisão que orbita em torno do herói. Por isso, aprender “o jeito da classe” é o atalho mais eficiente para começar a entender o jogo.
        </figcaption>
      </figure>

      <div class="box rules">
        <h4>Antes de ler a lista abaixo, decore isso</h4>
        <p><strong>Classe</strong> é o esqueleto do deck. <strong>Talento</strong> é o tempero. Dois heróis da mesma classe podem jogar de maneira parecida, mas um talento pode mudar muito a forma do deck. Então pense assim: primeiro eu entendo a classe, depois eu descubro as variações.</p>
      </div>

      <h3>As classes em português de pancadaria</h3>
      <div class="class-grid">
        <div class="class-card">
          <h4>Guardian</h4>
          <div class="tag-row"><span class="mini-tag">Control</span><span class="mini-tag">Midrange</span><span class="mini-tag">Crush</span><span class="mini-tag">Dominate</span></div>
          <p><strong>Como joga:</strong> defende bem, organiza a mão e escolhe o momento certo para descer um ataque gigantesco.</p>
          <p><strong>O que esperar:</strong> ataques caros, golpes de 7 ou mais, efeitos que punem bloqueio ruim e armas pesadas.</p>
          <p><strong>Heróis conhecidos:</strong> Bravo, Victor e Betsy.</p>
          <p><strong>Para quem é:</strong> quem gosta de bater pouco, mas bater como caminhão sem freio.</p>
        </div>

        <div class="class-card">
          <h4>Ninja</h4>
          <div class="tag-row"><span class="mini-tag">Aggro</span><span class="mini-tag">Tempo</span><span class="mini-tag">Go Again</span><span class="mini-tag">Combo</span></div>
          <p><strong>Como joga:</strong> usa vários ataques pequenos e eficientes no mesmo turno.</p>
          <p><strong>O que esperar:</strong> cadeias longas, muito Go Again, links de combate e cartas que melhoram quando jogadas em sequência.</p>
          <p><strong>Heróis conhecidos:</strong> Katsu, Fai, Zen e Cindra.</p>
          <p><strong>Para quem é:</strong> quem gosta de ritmo rápido, microdecisão e irritar o oponente com “só mais um ataque”.</p>
        </div>

        <div class="class-card">
          <h4>Brute</h4>
          <div class="tag-row"><span class="mini-tag">Aggro</span><span class="mini-tag">Midrange</span><span class="mini-tag">High Roll</span><span class="mini-tag">Intimidate</span></div>
          <p><strong>Como joga:</strong> troca consistência por brutalidade. Quer mãos explosivas e turnos que forçam bloqueios feios.</p>
          <p><strong>O que esperar:</strong> ataques enormes, descarte aleatório, intimidação e algumas decisões que parecem crime organizado.</p>
          <p><strong>Heróis conhecidos:</strong> Rhinar, Levia e Kayo.</p>
          <p><strong>Para quem é:</strong> quem gosta de risco, dano bruto e do sentimento de “vai dar certo, eu acho”.</p>
        </div>

        <div class="class-card">
          <h4>Warrior</h4>
          <div class="tag-row"><span class="mini-tag">Midrange</span><span class="mini-tag">Tempo</span><span class="mini-tag">Weapon</span><span class="mini-tag">Reprise</span></div>
          <p><strong>Como joga:</strong> pressiona com arma, usa reações de ataque e transforma números pequenos em decisões horríveis.</p>
          <p><strong>O que esperar:</strong> cálculo de breakpoints, ameaça escondida na mão e muita carta que fica melhor se você bloquear.</p>
          <p><strong>Heróis conhecidos:</strong> Dorinthea, Boltyn, Kassai e Olympia.</p>
          <p><strong>Para quem é:</strong> quem gosta de precisão, blefe e combate “limpo”, porém traiçoeiro.</p>
        </div>

        <div class="class-card">
          <h4>Ranger</h4>
          <div class="tag-row"><span class="mini-tag">Tempo</span><span class="mini-tag">Midrange</span><span class="mini-tag">Arsenal</span><span class="mini-tag">Arrow</span></div>
          <p><strong>Como joga:</strong> prepara o arsenal, carrega flechas e escolhe muito bem quando disparar o turno forte.</p>
          <p><strong>O que esperar:</strong> dependência maior do arsenal, ataques à distância, armadilhas e turnos técnicos.</p>
          <p><strong>Heróis conhecidos:</strong> Azalea e Riptide.</p>
          <p><strong>Para quem é:</strong> quem gosta de planejamento, setup e de fazer o oponente temer uma carta virada para baixo.</p>
        </div>

        <div class="class-card">
          <h4>Mechanologist</h4>
          <div class="tag-row"><span class="mini-tag">Aggro</span><span class="mini-tag">Engine</span><span class="mini-tag">Boost</span><span class="mini-tag">Itens</span></div>
          <p><strong>Como joga:</strong> transforma recurso em eficiência, usando boost, armas, itens e linhas muito calculadas.</p>
          <p><strong>O que esperar:</strong> turnos rápidos, várias peças pequenas trabalhando juntas e muito amor por cartas azuis.</p>
          <p><strong>Heróis conhecidos:</strong> Dash I/O, Teklovossen e Maxx “The Hype” Nitro.</p>
          <p><strong>Para quem é:</strong> quem gosta de engenharia de turno, sequência e estética de tecnologia com agressividade.</p>
        </div>

        <div class="class-card">
          <h4>Wizard</h4>
          <div class="tag-row"><span class="mini-tag">Control</span><span class="mini-tag">Combo</span><span class="mini-tag">Arcane</span><span class="mini-tag">Instant</span></div>
          <p><strong>Como joga:</strong> ameaça dano arcano, muitas vezes no turno do oponente, e pune quem não respeita janelas.</p>
          <p><strong>O que esperar:</strong> instants, cálculo de recurso, explosões repentinas e muita pergunta sobre prioridade.</p>
          <p><strong>Heróis conhecidos:</strong> Kano é a grande referência histórica da classe.</p>
          <p><strong>Para quem é:</strong> quem gosta de jogar “fora da curva” e fazer o adversário se arrepender de não trazer Arcane Barrier.</p>
        </div>

        <div class="class-card">
          <h4>Runeblade</h4>
          <div class="tag-row"><span class="mini-tag">Midrange</span><span class="mini-tag">Combo</span><span class="mini-tag">Hybrid</span><span class="mini-tag">Runechants</span></div>
          <p><strong>Como joga:</strong> mistura dano físico e arcano, acumulando pequenas vantagens até um turno de explosão.</p>
          <p><strong>O que esperar:</strong> runechants, buffs, ataques híbridos e matemática meio maligna.</p>
          <p><strong>Heróis conhecidos:</strong> Viserai e Vynnset, além de nomes que mudam bastante com o Living Legend.</p>
          <p><strong>Para quem é:</strong> quem quer agressão com cérebro e gosta de ver o bloqueio do oponente ficar esquisito.</p>
        </div>

        <div class="class-card">
          <h4>Illusionist</h4>
          <div class="tag-row"><span class="mini-tag">Control</span><span class="mini-tag">Value</span><span class="mini-tag">Phantasm</span><span class="mini-tag">Ward</span></div>
          <p><strong>Como joga:</strong> monta ameaças que precisam ser respondidas do jeito certo, muitas vezes com auras, espectros ou ilusões.</p>
          <p><strong>O que esperar:</strong> jogo mais estranho, proteção indireta, testes de conhecimento do oponente e valor por permanentes.</p>
          <p><strong>Heróis conhecidos:</strong> Prism e Enigma.</p>
          <p><strong>Para quem é:</strong> quem gosta de tabuleiro, camadas de efeito e de ganhar porque o outro respondeu errado.</p>
        </div>

        <div class="class-card">
          <h4>Assassin</h4>
          <div class="tag-row"><span class="mini-tag">Control</span><span class="mini-tag">Tempo</span><span class="mini-tag">Stealth</span><span class="mini-tag">Contract</span></div>
          <p><strong>Como joga:</strong> atrasa a vida do oponente, mexe em informações, usa stealth e constrói vantagem por desconforto.</p>
          <p><strong>O que esperar:</strong> ataques difíceis de interagir, contratos, descarte e sensação constante de que você está sendo sabotado.</p>
          <p><strong>Heróis conhecidos:</strong> Arakni, Uzuri e Nuu.</p>
          <p><strong>Para quem é:</strong> quem gosta de jogo sujo, técnico e de fazer o outro jogar menos do que gostaria.</p>
        </div>
      </div>


      <h3>Heróis adultos da tabela, por classe</h3>
      <p>Agora que você já entendeu o “jeito” das classes, entra a parte que todo iniciante adora perguntar: <strong>“tá, mas qual herói faz o quê?”</strong> A lista abaixo organiza os heróis adultos da tabela enviada por classe, com vida, intelecto e habilidade resumida.</p>

      <div class="box warning">
        <h4>Aviso anti-treta de torneio</h4>
        <p>Esta seção é didática: ajuda a reconhecer heróis e planos de jogo. <strong>Legalidade em CC, Living Legend, banimentos e erratas mudam</strong>, então antes de montar deck para evento, confira sempre a fonte oficial mais recente. O guia ensina a não ser lerdo; ele não substitui juiz.</p>
      </div>

      <div class="hero-roster">
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/guardian-banner.webp' | relative_url }}" alt="Grupo de heróis Guardian de Flesh and Blood">
            <div class="summary-copy">
              <span>Guardian</span>
              <small>7 heróis • Martelo, escudo, custo alto e a frase: “bloqueia isso se conseguir”.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Betsy, Skin in the Game</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Quando um ataque seu faz <strong>wager</strong>, pode pagar <code>{r}{r}</code> para dar +1 e <strong>overpower</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Bravo, Showstopper</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Paga <code>{r}{r}</code> e vira: próximo ataque Guardian de custo 3+ ganha <strong>dominate</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Bravo, Star of the Show</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Com Earth, Ice e Lightning no pitch, ataques caros ganham bônus, <strong>dominate</strong> e <strong>go again</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Jarl Vetreiði</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Earth/Ice</strong>; ao jogar Ice, cria <strong>Frostbite</strong> em zona exposta do oponente.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Oldhim, Grandfather of Eternity</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Earth/Ice</strong>; defense reaction previne dano com Earth ou trava mão do atacante com Ice.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Pleiades, Superstar</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Move suspense counter entre auras; quando a crowd cheers, cria <strong>Confidence</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Victor Goldmane, High and Mighty</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao criar Gold por efeito seu, compra carta; pode destruir Gold para repetir <strong>clash</strong> perdido.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/ninja-banner.webp' | relative_url }}" alt="Grupo de heróis Ninja de Flesh and Blood">
            <div class="summary-copy">
              <span>Ninja</span>
              <small>5 heróis • Vários ataques pequenos, Go Again e o oponente contando até perder a paciência.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Cindra, Dracai of Retribution</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao acertar herói marcado cria <strong>Fealty</strong>; pode equipar até 2 Draconic daggers do cemitério.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Fai, Rising Rebellion</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Começa com <strong>Phoenix Flame</strong> no cemitério; recupera Phoenix Flame pagando menos por chain links Draconic.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Ira, Scarlet Revenger</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>O segundo ataque de cada turno ganha +1.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Katsu, the Wanderer</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao acertar com attack action, pode descartar custo 0 para buscar carta com <strong>combo</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Zen, Tamer of Purpose</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Cria <strong>Crouching Tiger</strong> na mão, busca carta com <strong>combo</strong>, bane e pode jogar no turno.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/brute-banner.webp' | relative_url }}" alt="Grupo de heróis Brute de Flesh and Blood">
            <div class="summary-copy">
              <span>Brute</span>
              <small>6 heróis • Ataques grandes, descarte, caos e matemática feita com machado.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Kayo, Armed and Dangerous</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Tem só 1 zona de arma; seus attacks têm +1 fora da chain; descartar 6+ cria <strong>Might</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Kayo, Underhanded Cheat</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Começa com 1 zona de arma; pode fazer um attack action ter base 6; quando a crowd dá boo, cria <strong>Vigor</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Levia, Shadowborn Abomination</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Se carta de 6+ foi banida no turno, suas cartas perdem <strong>blood debt</strong> na end phase.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Lyath Goldmane, Vile Savant</strong></td>
                  <td class="hero-stat">40 / 5</td>
                  <td>Suas cartas têm ataque/defesa base pela metade; quando a crowd dá boo, cria <strong>Might</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Rhinar, Reckless Rampage</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao descartar carta de 6+ durante sua action phase, faz <strong>intimidate</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Tuffnut, Bumbling Hulkster</strong></td>
                  <td class="hero-stat">40 / 3</td>
                  <td>Vira para pitchar topo; se for 6+, a crowd cheers; quando cheers, cria <strong>Toughness</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/warrior-banner.webp' | relative_url }}" alt="Grupo de heróis Warrior de Flesh and Blood">
            <div class="summary-copy">
              <span>Warrior</span>
              <small>5 heróis • Armas, reações e truques de combate que transformam bloqueio em armadilha.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Dorinthea Ironsong</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Quando seu ataque de arma acerta, o próximo ataque com essa arma no turno ganha +1.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Fang, Dracai of Blades</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao acertar herói marcado cria <strong>Fealty</strong>; com 3+ Fealty, ataques de dagger custam menos.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Kassai of the Golden Sand</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Se comprou carta, ataques de Sword custam menos; pode preparar criação de <strong>Gold</strong> ao acertar com arma.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Olympia, Prized Fighter</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>A primeira vez que cada ataque seu vence <strong>wager</strong>, cria <strong>Gold</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Ser Boltyn, Breaker of Dawn</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Se deu <strong>charge</strong>, ataques ganham +1 quando defendidos por attack action; pode banir soul para dar <strong>go again</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/ranger-banner.webp' | relative_url }}" alt="Grupo de heróis Ranger de Flesh and Blood">
            <div class="summary-copy">
              <span>Ranger</span>
              <small>4 heróis • Arsenal, flechas e a habilidade de fazer uma carta virada para baixo parecer uma ameaça de morte.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Azalea, Ace in the Hole</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Troca carta do arsenal pelo topo do deck; se for Arrow, ganha <strong>dominate</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Lexi, Livewire</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Ice/Lightning</strong>; revela arsenal: Lightning dá <strong>go again</strong>, Ice cria <strong>Frostbite</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Marlynn, Treasure Hunter</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Destrói Gold para criar <strong>Goldfin Harpoon</strong>; ao comprar na action phase, pode colocar Arrow no arsenal.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Riptide, Lurker of the Deep</strong></td>
                  <td class="hero-stat">38 / 4</td>
                  <td>Ao jogar carta da mão, pode pôr carta no arsenal; traps causam 1 dano ao atacante.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/mech-banner.webp' | relative_url }}" alt="Grupo de heróis Mechanologist de Flesh and Blood">
            <div class="summary-copy">
              <span>Mechanologist</span>
              <small>5 heróis • Tecnologia, boost, itens, engrenagens e turnos que parecem oficina em incêndio.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Dash, Inventor Extraordinaire</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Começa o jogo com um item Mechanologist de custo 2 ou menos em campo.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Dash I/O</strong></td>
                  <td class="hero-stat">36 / 4</td>
                  <td>Pode olhar o topo do deck; uma vez por turno joga item Mechanologist de custo 0 ou 1 do topo como instant.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Maxx ‘The Hype’ Nitro</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Depois de <strong>boost</strong>, cria <strong>Hyper Driver</strong>; Hyper Drivers têm <strong>crank</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Puffin, Hightail</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Destrói Gold para criar <strong>Golden Cog</strong>; na segunda vez que faz <strong>crank</strong> no turno, compra carta.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Teklovossen, Esteemed Magnate</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Usa Evos/equipamentos base; plano gira em banir/transformar equipamentos e montar armadura.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/wizard-banner.webp' | relative_url }}" alt="Grupo de heróis Wizard de Flesh and Blood">
            <div class="summary-copy">
              <span>Wizard</span>
              <small>3 heróis • Dano arcano, instants e aquele medo de morrer no próprio turno.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Iyslander, Stormbind</strong></td>
                  <td class="hero-stat">36 / 4</td>
                  <td><strong>Essence of Ice</strong>; no turno do oponente joga non-attacks azuis do arsenal como instant e cria <strong>Frostbite</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Kano, Dracai of Aether</strong></td>
                  <td class="hero-stat">30 / 4</td>
                  <td>Paga <code>{r}{r}{r}</code> para banir o topo; se for non-attack, pode jogar como instant.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Oscilio, Constella Intelligence</strong></td>
                  <td class="hero-stat">36 / 4</td>
                  <td><strong>Essence of Lightning</strong>; descarta instant para comprar carta.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/runeblade-banner.webp' | relative_url }}" alt="Grupo de heróis Runeblade de Flesh and Blood">
            <div class="summary-copy">
              <span>Runeblade</span>
              <small>7 heróis • Mistura dano físico e arcano, com Runechants e contas que deixam o bloqueio esquisito.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Aurora, Shooting Star</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Lightning</strong>; cria <strong>Embodiment of Lightning</strong> se você jogou carta Lightning.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Briar, Warden of Thorns</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Earth/Lightning</strong>; cria tokens de Earth/Lightning conforme dano e non-attack jogada.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Chane, Bound by Shadow</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Cria <strong>Soul Shackle</strong> para dar <strong>go again</strong> à próxima ação Runeblade ou Shadow.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Florian, Rotwood Harbinger</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Earth</strong>; com 8+ Earth banidas, cria tokens de aura extras.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Verdance, Thorn of the Rose</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td><strong>Essence of Earth</strong>; com 8+ Earth banidas, ganhar vida no seu turno pode causar 1 dano arcane.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Viserai, Rune Blood</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao jogar Runeblade depois de uma non-attack no turno, cria <strong>Runechant</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Vynnset, Iron Maiden</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Cria Runechant no começo se tiver poucos; usa Shadow non-attacks para banir carta da mão e criar Runechant.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/illusionist-banner.webp' | relative_url }}" alt="Grupo de heróis Illusionist de Flesh and Blood">
            <div class="summary-copy">
              <span>Illusionist</span>
              <small>4 heróis • Auras, ilusões, Spectral Shields e ameaças que exigem a resposta certa.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Dromai, Ash Artist</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao pitchar carta vermelha cria <strong>Ash</strong>; se jogou vermelha, seus dragões atacam com <strong>go again</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Enigma, Ledger of Ancestry</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Primeiro ataque de <strong>Spectral Shield</strong> custa menos; cria Spectral Shield com contador +1.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Prism, Awakener of Sol</strong></td>
                  <td class="hero-stat">32 / 4</td>
                  <td>Heralds que entram na soul buscam Figment; pode banir soul para <strong>awaken</strong> Figment.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Prism, Sculptor of Arc Light</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Bane carta da soul para criar <strong>Spectral Shield</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/assassin-banner.webp' | relative_url }}" alt="Grupo de heróis Assassin de Flesh and Blood">
            <div class="summary-copy">
              <span>Assassin</span>
              <small>5 heróis • Stealth, contract, banimento e o nobre esporte de desmontar a mão do oponente.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Arakni, 5L!p3d 7hRu 7h3 cR4X</strong></td>
                  <td class="hero-stat">38 / 4</td>
                  <td>O primeiro ataque com <strong>stealth</strong> de cada turno ganha <strong>go again</strong>.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Arakni, Huntsman</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ao jogar carta com <strong>contract</strong>, olha o topo do deck do oponente e pode mandar para o fundo.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Arakni, Marionette</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Ataques com <strong>stealth</strong> contra herói marcado ganham +1; no fim do turno pode virar um Agent of Chaos aleatório.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Nuu, Alluring Desire</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Stealth bane defesas de ação; com Chi, olha topo do oponente e pode jogar cartas azuis banidas dele.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Uzuri, Switchblade</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Reação de ataque troca um ataque com <strong>stealth</strong> por attack action de custo 2 ou menos da mão.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/pirate-banner.webp' | relative_url }}" alt="Grupo de heróis Pirate de Flesh and Blood">
            <div class="summary-copy">
              <span>Pirate</span>
              <small>3 heróis • Gold, tesouro, navio, pirataria temática e planos que misturam saque, arsenal e gambiarra.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Gravy Bones, Shipwrecked Looter</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Destrói Gold para comprar e descartar; se azul foi ao cemitério, joga cartas com <strong>watery grave</strong> do cemitério.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Marlynn, Treasure Hunter</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Destrói Gold para criar <strong>Goldfin Harpoon</strong>; ao comprar na action phase, pode colocar Arrow no arsenal.</td>
                </tr>
                <tr>
                  <td class="hero-name"><strong>Puffin, Hightail</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Destrói Gold para criar <strong>Golden Cog</strong>; na segunda vez que faz <strong>crank</strong> no turno, compra carta.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <details class="hero-class" open>
          <summary>
            <img class="hero-banner" src="{{ '/assets/img/guias/fab-para-lerdos/necromancer-banner.webp' | relative_url }}" alt="Grupo de heróis Necromancer de Flesh and Blood">
            <div class="summary-copy">
              <span>Necromancer</span>
              <small>1 herói • Cemitério como recurso, magia sombria e a elegante arte de fazer coisa morta continuar trabalhando.</small>
            </div>
          </summary>
          <div class="hero-table-wrap">
            <table class="hero-table">
              <thead>
                <tr>
                  <th>Herói adulto</th>
                  <th>Vida / Intelecto</th>
                  <th>Habilidade resumida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="hero-name"><strong>Gravy Bones, Shipwrecked Looter</strong></td>
                  <td class="hero-stat">40 / 4</td>
                  <td>Destrói Gold para comprar e descartar; se azul foi ao cemitério, joga cartas com <strong>watery grave</strong> do cemitério.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <div class="grid-2">
        <div class="card">
          <h4>Se você gosta de...</h4>
          <ul class="mini-list">
            <li><strong>Bater forte:</strong> Guardian ou Brute.</li>
            <li><strong>Fazer vários ataques:</strong> Ninja ou Mechanologist.</li>
            <li><strong>Ganhar na técnica:</strong> Warrior ou Ranger.</li>
            <li><strong>Jogar no turno dos outros:</strong> Wizard.</li>
            <li><strong>Ganhar no incômodo:</strong> Assassin.</li>
            <li><strong>Jogo estranho e cheio de camadas:</strong> Illusionist ou Runeblade.</li>
          </ul>
        </div>
        <div class="card">
          <h4>Como escolher seu primeiro herói</h4>
          <ul class="mini-list">
            <li>Escolha uma classe cujo <strong>plano de jogo faça sentido para você</strong>.</li>
            <li>Evite começar por uma classe só porque ela é “forte no meta”.</li>
            <li>Veja se o deck pede muita regra, muita janela ou muita conta.</li>
            <li>Jogue algumas partidas e perceba se você gosta mais de <strong>pressionar, controlar ou montar combo</strong>.</li>
            <li>Se o herói faz você sorrir quando compra a mão, já é um ótimo sinal.</li>
          </ul>
        </div>
      </div>

      <div class="box rules">
        <h4>Como usar a lista de heróis</h4>
        <p>Para escolher um herói, não comece procurando “o mais forte”. Comece procurando o herói cujo plano combina com você. Se a habilidade pede sequência, recurso, arsenal, Gold, pitch ou cemitério, ela está avisando como aquele deck quer funcionar. Sim, a carta está tentando conversar. O jogador de TCG é que costuma fingir que não ouviu.</p>
      </div>

      <div class="box humor">
        <h4>Tradução para lerdos</h4>
        <p>Sentou contra Guardian? Espere marretada. Contra Ninja? Espere cinco ataques e um sermão sobre eficiência. Contra Wizard? Espere sofrer numa janela que você nem sabia que existia. Contra Assassin? Espere sair da partida com a sensação de que foi assaltado legalmente.</p>
      </div>

      <p>Escolheu seu tipo de problema? Agora falta escolher onde jogar sem ser atropelado por um campeão com deck que custa mais do que sua dignidade.</p>
    </section>

    <section class="page" id="cap11">
      <div class="chapter-number">Capítulo 11</div>
      <h2>Formatos para começar</h2>
      <p class="lead">Formato é o tipo de partida. Ele define herói, tamanho do deck, cartas permitidas e nível de sofrimento financeiro.</p>

      <div class="box rules">
        <h4>Regra de ouro dos formatos</h4>
        <p>Cada formato tem sua própria estrutura de deck e sua própria lista de cartas legais, banidas e/ou restritas. Essa lista <strong>não é estática</strong>. Antes de montar deck ou entrar em evento, confira a <strong>Card Legality Policy</strong> e a página do formato correspondente.</p>
      </div>

      <h3>Os formatos oficiais mais importantes para quem começa</h3>
      <table>
        <thead>
          <tr>
            <th>Formato</th>
            <th>Herói / tamanho</th>
            <th>Construção básica</th>
            <th>Como é na prática</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Classic Constructed</strong></td>
            <td>1 herói adulto<br>Card pool de 80<br>Deck inicial com mínimo de 60</td>
            <td>Até 3 cópias de cada carta única. Só entram cartas da classe/talento do herói e genéricas compatíveis.</td>
            <td>É o formato competitivo principal. Mais profundo, mais caro e mais completo.</td>
          </tr>
          <tr>
            <td><strong>Living Legend</strong></td>
            <td>Mesma estrutura do CC</td>
            <td>Segue a base do CC, mas permite heróis e armas que já viraram Living Legend. Tem banlist/restricted própria.</td>
            <td>O “museu dos monstros”: heróis fortíssimos que já saíram do CC continuam vivos aqui.</td>
          </tr>
          <tr>
            <td><strong>Blitz</strong></td>
            <td>1 herói jovem<br>Card pool de 52<br>Deck inicial com exatamente 40</td>
            <td>Até 1 cópia de cada carta única, incluindo armas e equipamentos.</td>
            <td>Rápido, explosivo e ótimo para aprender ou testar deck, mas pune muito erro.</td>
          </tr>
          <tr>
            <td><strong>Silver Age</strong></td>
            <td>1 herói jovem<br>Card pool de 55<br>Deck inicial com exatamente 40</td>
            <td>Herói e cartas devem ser de raridade comum ou rara. Até 2 cópias de cada carta única.</td>
            <td>É a porta de entrada oficial e acessível. Substituiu o Commoner como formato reconhecido oficialmente.</td>
          </tr>
        </tbody>
      </table>

      <div class="grid-2">
        <div class="card">
          <h4>Formatos limitados oficiais</h4>
          <ul class="mini-list">
            <li><strong>Sealed Deck:</strong> você abre boosters e monta seu deck com o que veio.</li>
            <li><strong>Booster Draft:</strong> escolhe cartas de boosters passados entre jogadores.</li>
            <li><strong>Blitz Preconstructed:</strong> usa decks pré-montados específicos do produto/evento.</li>
          </ul>
          <p class="class-note">Nos formatos limitados, o organizador fornece o material do evento e a construção acontece na hora.</p>
        </div>

        <div class="card">
          <h4>Formatos especiais / oficiais de jogo</h4>
          <ul class="mini-list">
            <li><strong>Ira - Learn to Play:</strong> formato didático para ensinar do zero.</li>
            <li><strong>Ultimate Pit Fight:</strong> multiplayer, bagunça organizada e muita diplomacia falsa.</li>
            <li><strong>Team Format:</strong> torneios em equipe seguindo regras específicas.</li>
          </ul>
          <p class="class-note">Na página de gameplay oficial ainda aparecem variantes e formatos especiais adicionais, mas os acima já cobrem o que o iniciante mais precisa reconhecer.</p>
        </div>
      </div>

      <div class="box warning">
        <h4>Importante: Commoner</h4>
        <p><strong>Commoner</strong> foi um formato muito querido pela comunidade, mas a página oficial informa que ele <strong>deixou de ser usado oficialmente em 1º de janeiro de 2026</strong>. Para a proposta de formato jovem, acessível e barato, a recomendação oficial hoje é <strong>Silver Age</strong>.</p>
      </div>

      <div class="box example">
        <h4>Qual formato indicar para iniciante?</h4>
        <p>Se a ideia é aprender com baixo custo, vá de <strong>Silver Age</strong> ou mesas casuais com deck simples. Se quer partidas rápidas, <strong>Blitz</strong>. Se quer o jogo “completo”, com sideboard e construção mais séria, <strong>Classic Constructed</strong>. Se você gosta de abrir produto e improvisar, <strong>Sealed</strong> e <strong>Draft</strong> são excelentes portas de entrada.</p>
      </div>

      <div class="box humor">
        <h4>Conselho para comunidade</h4>
        <p>Para ensinar jogador novo, comece com formato simples, deck honesto e partida aberta. O objetivo não é provar superioridade intelectual. É fazer a pessoa voltar a jogar semana que vem.</p>
      </div>

      <p>Agora vamos fechar com um plano prático de primeira partida, porque ler guia demais sem jogar também é uma forma sofisticada de procrastinação.</p>
    </section>

    <section class="page" id="cap12">
      <div class="chapter-number">Capítulo 12</div>
      <h2>Plano de primeira partida</h2>
      <p class="lead">Dois lerdos entram. Um lerdo sai menos perdido. Esse é o objetivo.</p>

      <div class="box rules">
        <h4>Missão da comunidade</h4>
        <p>Se a primeira experiência for boa, ele volta. Se for ruim, ele vende as cartas, reclama do inglês e vai embora. Então ensinar bem também é deckbuilding social.</p>
      </div>

      <div class="friendly-list">
        <div class="card">
          <h4>Antes de começar</h4>
          <ul>
            <li>Use decks simples.</li>
            <li>Explique a mão inicial.</li>
            <li>Mostre custo, pitch, ataque e defesa nas cartas.</li>
            <li>Combine que erro bobo pode voltar.</li>
            <li>Não use deck cheio de pegadinha contra quem mal sabe dar pitch.</li>
          </ul>
        </div>
        <div class="card">
          <h4>Frases úteis na mesa</h4>
          <ul>
            <li>“Essa carta custa quanto?”</li>
            <li>“Você tem recurso para pagar?”</li>
            <li>“Depois disso tem Go Again?”</li>
            <li>“Esse efeito de hit importa?”</li>
            <li>“Vale a pena bloquear ou tomar?”</li>
            <li>“Você quer colocar algo no arsenal?”</li>
          </ul>
        </div>
      </div>

      <div class="box example">
        <h4>Roteiro para ensinar</h4>
        <p>Primeira partida: joguem de mão aberta por alguns turnos. Segunda partida: deixem o iniciante decidir sozinho, mas explique depois. Terceira partida: aí sim deixe ele errar e aprender com a dor, que também é professora.</p>
      </div>

      <div class="box humor">
        <h4>Zoeira final</h4>
        <p>Parabéns. Você ainda não sabe jogar bem, mas já sabe o suficiente para perder entendendo aproximadamente o motivo. Isso, em Flesh and Blood, já é evolução espiritual.</p>
      </div>
</section>
  </main>
</div>
