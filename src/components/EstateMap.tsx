type MapKind = 'nandi' | 'alibaug';

function Nandi() {
  return (
    <svg viewBox="0 0 680 460" role="img" aria-label="Survey map of Nandi Hills Orchard Second Home: a single boundary containing five orchard blocks, a pond, a shed and an access road" data-ui>
      <rect width="680" height="460" fill="#ffffff" />
      <text x="84" y="34" fontSize="12" fill="#767f70" letterSpacing="0.08em">
        SURVEY NO. 118/2 · 10.00 ACRES
      </text>
      <path d="M84 118 L236 58 L474 66 L606 176 L576 352 L360 414 L132 340 Z" fill="#f2f4ef" stroke="#73826d" strokeWidth="2.5" />
      <g stroke="#cfd4c8" strokeWidth="0.8">
        <path d="M110 140 L238 102 L246 190 L120 232 Z" fill="#e7eae2" />
        <path d="M262 96 L408 104 L414 196 L270 188 Z" fill="#cfd4c8" />
        <path d="M428 110 L560 132 L548 230 L436 212 Z" fill="#e7eae2" />
        <path d="M140 250 L318 226 L330 302 L162 326 Z" fill="#cfd4c8" />
        <path d="M352 222 L520 244 L508 318 L342 298 Z" fill="#e7eae2" />
      </g>
      <g stroke="#73826d" strokeWidth="1.2" strokeDasharray="1 7" strokeLinecap="round" opacity="0.55">
        <path d="M128 158 L232 126" />
        <path d="M132 178 L238 146" />
        <path d="M136 200 L240 166" />
        <path d="M286 118 L398 124" />
        <path d="M288 140 L400 146" />
        <path d="M290 162 L402 168" />
        <path d="M170 264 L306 242" />
        <path d="M176 286 L312 264" />
        <path d="M462 138 L540 154" />
        <path d="M458 162 L538 178" />
        <path d="M456 186 L536 202" />
        <path d="M386 246 L500 260" />
        <path d="M382 268 L498 282" />
      </g>
      <path d="M606 176 C520 212 472 244 424 304 L330 338" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" />
      <path d="M606 176 C520 212 472 244 424 304 L330 338" fill="none" stroke="#cfd4c8" strokeWidth="1" strokeDasharray="4 8" />
      <ellipse cx="452" cy="332" rx="52" ry="29" fill="#cfd4c8" stroke="#767f70" strokeWidth="1.2" />
      <rect x="255" y="328" width="46" height="30" fill="#a6ada0" stroke="#5d6459" strokeWidth="1.2" />
      <g fill="#73826d">
        {[
          [96, 138], [102, 180], [112, 226], [120, 268], [130, 306], [150, 326], [190, 344], [250, 366], [316, 386], [380, 396], [436, 388], [500, 364], [548, 340], [568, 296], [584, 244], [590, 196], [560, 78], [500, 66], [430, 66], [352, 62], [276, 58], [206, 78], [154, 100],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 5.6 : 4} />
        ))}
      </g>
      <g fontSize="12" fill="#4e5a49" fontWeight="500">
        <text x="142" y="170">ORCHARD A</text>
        <text x="298" y="146">ORCHARD B</text>
        <text x="452" y="166">ORCHARD C</text>
        <text x="182" y="278">ORCHARD D</text>
        <text x="394" y="266">ORCHARD E</text>
        <text x="430" y="336">POND</text>
        <text x="248" y="378" fill="#5d6459">SHED</text>
        <text x="470" y="238" fill="#767f70">ACCESS ROAD</text>
      </g>
      <g transform="translate(620,60)" fill="#73826d">
        <path d="M0 -22 L7 2 L0 -3 L-7 2 Z" />
        <text x="0" y="18" textAnchor="middle" fontSize="12" fill="#5d6459">N</text>
      </g>
      <g transform="translate(84,424)">
        <line x1="0" y1="0" x2="70" y2="0" stroke="#73826d" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#73826d" strokeWidth="2" />
        <line x1="70" y1="-4" x2="70" y2="4" stroke="#73826d" strokeWidth="2" />
        <text x="78" y="4" fontSize="12" fill="#5d6459">100 m</text>
      </g>
    </svg>
  );
}

function Alibaug() {
  return (
    <svg viewBox="0 0 680 460" role="img" aria-label="Survey map of the Alibaug coastal land: a single boundary beside a creek and the sea, with coconut groves and an access lane" data-ui>
      <rect width="680" height="460" fill="#ffffff" />
      <text x="84" y="34" fontSize="12" fill="#767f70" letterSpacing="0.08em">
        GAT NO. 244 · 6.00 ACRES · COMING SOON
      </text>
      <path d="M0 372 C120 352 220 400 330 386 C450 370 560 404 680 380 L680 460 L0 460 Z" fill="#cfd4c8" />
      <g stroke="#767f70" strokeWidth="1.2" fill="none" opacity="0.7">
        <path d="M20 414 C140 396 240 438 360 424 C480 410 580 440 660 422" />
        <path d="M40 438 C160 422 250 456 370 446 C490 434 590 458 660 446" />
      </g>
      <path d="M90 96 L556 74 L620 218 L552 356 L140 372 L70 238 Z" fill="#f2f4ef" stroke="#73826d" strokeWidth="2.5" />
      <path d="M108 132 L322 112 L330 250 L126 274 Z" fill="#cfd4c8" />
      <path d="M356 108 L548 100 L566 232 L364 250 Z" fill="#e7eae2" />
      <path d="M142 296 L360 278 L370 348 L156 358 Z" fill="#e7eae2" />
      <path d="M388 276 L540 266 L534 340 L392 346 Z" fill="#cfd4c8" />
      <path d="M90 96 C240 200 300 250 330 250 L370 300 L330 300 L510 372" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
      <path d="M90 96 C240 200 300 250 330 250 L370 300 L330 300 L510 372" fill="none" stroke="#cfd4c8" strokeWidth="1" strokeDasharray="4 8" />
      <g fill="#73826d">
        {[
          [130, 160], [160, 200], [190, 240], [230, 156], [262, 196], [292, 236], [150, 320], [190, 306], [230, 330], [270, 312], [396, 150], [430, 186], [466, 150], [500, 190], [420, 300], [460, 316], [500, 296], [530, 320], [560, 118], [582, 160], [104, 260], [592, 300],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3.4" />
            <path d={`M${cx} ${cy - 3} q 5 -7 9 -2`} fill="none" stroke="#73826d" strokeWidth="1.4" />
          </g>
        ))}
      </g>
      <g fontSize="12" fill="#4e5a49" fontWeight="500">
        <text x="170" y="190">COCONUT GROVE</text>
        <text x="404" y="176">MANGO &amp; PALM</text>
        <text x="190" y="318">OPEN PLOT</text>
        <text x="430" y="310">OPEN PLOT</text>
        <text x="486" y="252" fill="#767f70">ACCESS LANE</text>
        <text x="320" y="404" fill="#5d6459">ARABIAN SEA</text>
      </g>
      <g transform="translate(620,60)" fill="#73826d">
        <path d="M0 -22 L7 2 L0 -3 L-7 2 Z" />
        <text x="0" y="18" textAnchor="middle" fontSize="12" fill="#5d6459">N</text>
      </g>
      <g transform="translate(84,424)">
        <line x1="0" y1="0" x2="70" y2="0" stroke="#73826d" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#73826d" strokeWidth="2" />
        <line x1="70" y1="-4" x2="70" y2="4" stroke="#73826d" strokeWidth="2" />
        <text x="78" y="4" fontSize="12" fill="#5d6459">100 m</text>
      </g>
    </svg>
  );
}

export function EstateMap({ kind }: { kind: MapKind }) {
  return <div className="map-card">{kind === 'nandi' ? <Nandi /> : <Alibaug />}</div>;
}
