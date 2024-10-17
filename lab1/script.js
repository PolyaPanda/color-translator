const color = document.getElementById('color');
const r = document.getElementById('r');
const g = document.getElementById('g');
const b = document.getElementById('b');
const r_range = document.getElementById('r-range');
const g_range = document.getElementById('g-range');
const b_range = document.getElementById('b-range');

const c = document.getElementById('c');
const m = document.getElementById('m');
const y = document.getElementById('y');
const k = document.getElementById('k');
const c_range = document.getElementById('c-range');
const m_range = document.getElementById('m-range');
const y_range = document.getElementById('y-range');
const k_range = document.getElementById('k-range');

const h = document.getElementById('h');
const s = document.getElementById('s');
const l = document.getElementById('l');
const h_range = document.getElementById('h-range');
const s_range = document.getElementById('s-range');
const l_range = document.getElementById('l-range');

function rgbToCmyk(r, g, b) {
	let k = Math.min(1 - r / 255, 1 - g / 255, 1 - b / 255);
	let c = (1 - r / 255 - k) / (1 - k) || 0;
	let m = (1 - g / 255 - k) / (1 - k) || 0;
	let y = (1 - b / 255 - k) / (1 - k) || 0;
	return [
		Math.round(c * 100),
		Math.round(m * 100),
		Math.round(y * 100),
		Math.round(k * 100),
	];
}

function cmykToRgb(c, m, y, k) {
	c /= 100;
	m /= 100;
	y /= 100;
	k /= 100;
	let r = 255 * (1 - c) * (1 - k) || 0;
	let g = 255 * (1 - m) * (1 - k) || 0;
	let b = 255 * (1 - y) * (1 - k) || 0;
	return [Math.round(r), Math.round(g), Math.round(b)];
}

function cmykToHex(c, m, y, k) {
	const [r, g, b] = cmykToRgb(c, m, y, k);
	return rgbToHex(r, g, b);
}

function cmykToHsl(c, m, y, k) {
	const [r, g, b] = cmykToRgb(c, m, y, k);
	return rgbToHsl(r, g, b);
}

function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		l = (max + min) / 2,
		s;

	if (max === min) {
		h = s = 0;
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hslToCmyk(h, s, l) {
	const [r, g, b] = hslToRgb(h, s, l);
	return rgbToCmyk(Math.round(r), Math.round(g), Math.round(b));
}

function rgbToHex(r, g, b) {
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + +b).toString(16).slice(1).toUpperCase();
}

function hexToRgb(hex) {
	let bigint = parseInt(hex.slice(1), 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;
	return [Math.round(r), Math.round(g), Math.round(b)];
}

function updateColorsFromRgb() {
	color.value = rgbToHex(r.value, g.value, b.value);

	const cmyk = rgbToCmyk(r.value, g.value, b.value);
	[c.value, m.value, y.value, k.value] = cmyk;
	[c_range.value, m_range.value, y_range.value, k_range.value] = cmyk;

	const hsl = rgbToHsl(r.value, g.value, b.value);
	[h.value, s.value, l.value] = hsl;
	[h_range.value, s_range.value, l_range.value] = hsl;

	r_range.value = r.value;
	g_range.value = g.value;
	b_range.value = b.value;

	document.getElementById(
		"rgb-box"
	).style.backgroundColor = `rgb(${r.value}, ${g.value}, ${b.value})`;
	document.getElementById("cmyk-box").style.backgroundColor = `rgba(${
		255 * (1 - c.value / 100)
	}, ${255 * (1 - m.value / 100)}, ${255 * (1 - y.value / 100)}, 1)`;
	document.getElementById(
		"hls-box"
	).style.backgroundColor = `hsl(${h.value}, ${s.value}%, ${l.value}%)`;
}

function updateColorsFromCMYK() {
	const c_ = parseFloat(c.value);
    const m_ = parseFloat(m.value);
    const y_ = parseFloat(y.value);
    const k_ = parseFloat(k.value);
    
    const [r_, g_, b_] = cmykToRgb(c_, m_, y_, k_);
    r.value = r_;
    g.value = g_;
    b.value = b_;
    r_range.value = r_;
    g_range.value = g_;
    b_range.value = b_;

    color.value = cmykToHex(c_, m_, y_, k_);

    const [h_, s_, l_] = rgbToHsl(r_,g_,b_);
    h.value = h_;
    s.value = s_;
    l.value = l_;
    h_range.value = h_;
    s_range.value = s_;
    l_range.value = l_;

    c_range.value = c_;
    m_range.value = m_;
    y_range.value = y_;
    k_range.value = k_;
	
		document.getElementById(
			"rgb-box"
		).style.backgroundColor = `rgb(${r.value}, ${g.value}, ${b.value})`;
		document.getElementById("cmyk-box").style.backgroundColor = `rgba(${
			255 * (1 - c.value / 100)
		}, ${255 * (1 - m.value / 100)}, ${255 * (1 - y.value / 100)}, 1)`;
		document.getElementById(
			"hls-box"
		).style.backgroundColor = `hsl(${h.value}, ${s.value}%, ${l.value}%)`;
}

function updateColorsFromHSL() {
	  const h_ = parseFloat(h.value);
    const s_ = parseFloat(s.value);
    const l_ = parseFloat(l.value);

		color.value = hslToHex(h_, s_, l_,);
    
    const [r_, g_, b_] = hexToRgb(color.value);
    r.value = r_;
    g.value = g_;
    b.value = b_;
    r_range.value = r_;
    g_range.value = g_;
    b_range.value = b_;

    const [c_, m_, y_, k_] = rgbToCmyk(r_,g_,b_);
    c.value=c_;
		m.value = m_;
    y.value = y_;
    k.value = k_;
		c_range.value = c_;
    m_range.value = m_;
    y_range.value = y_;
    k_range.value = k_;

    h_range.value = h_;
    s_range.value = s_;
    l_range.value = l_;
	
		document.getElementById(
			"rgb-box"
		).style.backgroundColor = `rgb(${r.value}, ${g.value}, ${b.value})`;
		document.getElementById("cmyk-box").style.backgroundColor = `rgba(${
			255 * (1 - c.value / 100)
		}, ${255 * (1 - m.value / 100)}, ${255 * (1 - y.value / 100)}, 1)`;
		document.getElementById(
			"hls-box"
		).style.backgroundColor = `hsl(${h.value}, ${s.value}%, ${l.value}%)`;
}

color.addEventListener('input', function () {
	const hex = color.value;
	const rgb = hexToRgb(hex);
	[r.value, g.value, b.value] = rgb;
	updateColorsFromRgb();
});

function handleRgbChange() {
	updateColorsFromRgb();
}

function handleCMYKChange() {
	updateColorsFromCMYK();
}

function handleHSLChange() {
	updateColorsFromHSL();
}

r_range.addEventListener('input', function () {
	r.value = r_range.value;
	handleRgbChange();
});

g_range.addEventListener('input', function () {
	g.value = g_range.value;
	handleRgbChange();
});

b_range.addEventListener('input', function () {
	b.value = b_range.value;
	handleRgbChange();
});

r.addEventListener('input', function () {
	let value = parseInt(r.value);
	if (value <= 0) {
			r.value = 0;
	} else if (value > 255) {
			r.value = 255;
	} 
	r_range.value = r.value;
	handleRgbChange();
});

g.addEventListener('input', function () {
	let value = parseInt(g.value);
	if (value <= 0) {
			g.value = 0;
	} else if (value > 255) {
			g.value = 255;
	}
	g_range.value = g.value;
	handleRgbChange();
});

b.addEventListener('input', function () {
	let value = parseInt(b.value);
	if (value <= 0) {
			bt.value = 0;
	} else if (value > 255) {
			b.value = 255;
	}
	b_range.value = b.value;
	handleRgbChange();
});


c_range.addEventListener('input', function () {
	c.value = c_range.value;
	handleCMYKChange();
});

m_range.addEventListener('input', function () {
	m.value = m_range.value;
	handleCMYKChange();
});

y_range.addEventListener('input', function () {
	y.value = y_range.value;
	handleCMYKChange();
});

k_range.addEventListener('input', function () {
	k.value = k_range.value;
	handleCMYKChange();
});

c.addEventListener('input', function () {
	let value = parseInt(c.value);
	if (value < 0) {
			c.value = 0;
	} else if (value > 100) {
			c.value = 100;
	}
	c_range.value = c.value;
	handleCMYKChange();
});

m.addEventListener('input', function () {
	let value = parseInt(m.value);
	if (value < 0) {
			m.value = 0;
	} else if (value > 100) {
			m.value = 100;
	}
	m_range.value = m.value;
	handleCMYKChange();
});

y.addEventListener('input', function () {
	let value = parseInt(y.value);
	if (value < 0) {
			y.value = 0;
	} else if (value > 100) {
			y.value = 100;
	}
	y_range.value = y.value;
	handleCMYKChange();
});

k.addEventListener('input', function () {
	let value = parseInt(k.value);
	if (value < 0) {
			k.value = 0;
	} else if (value > 100) {
			k.value = 100;
	}
	k_range.value = k.value;
	handleCMYKChange();
});

h_range.addEventListener('input', function () {
	h.value = h_range.value;
	handleHSLChange();
});

s_range.addEventListener('input', function () {
	s.value = s_range.value;
	handleHSLChange();
});

l_range.addEventListener('input', function () {
	l.value = l_range.value;
	handleHSLChange();
});

h.addEventListener('input', function () {
	let value = parseInt(h.value);
	if (value < 0) {
			h.value = 0;
	} else if (value > 360) {
			h.value = 360;
	}
	h_range.value = h.value;
	handleHSLChange();
});

s.addEventListener('input', function () {
	let value = parseInt(s.value);
	if (value < 0) {
			s.value = 0;
	} else if (value > 100) {
			s.value = 100;
	}
	s_range.value = s.value;
	handleHSLChange();
});

l.addEventListener('input', function () {
	let value = parseInt(l.value);
	if (value < 0) {
			l.value = 0;
	} else if (value > 100) {
			l.value = 100;
	}
	l_range.value = l.value;
	handleHSLChange();
});

document.addEventListener("DOMContentLoaded", (event) => {
color.value = rgbToHex(0, 0, 0)
});

document.addEventListener('DOMContentLoaded', function() {
					c.value = 0;
					m.value = 29;
					y.value = 14;
					k.value = 37;

					handleCMYKChange();
});

