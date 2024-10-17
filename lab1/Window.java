import javax.swing.*;
class ColorConverter extends JFrame {
    public ColorConverter() {
        JColorChooser colorChooser = new JColorChooser();
        add(colorChooser);
        setSize(600, 400);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    public static void main(String[] args) {
        ColorConverter window = new ColorConverter();
    }
}
//import javax.swing.*;
//import java.awt.*;
//import javax.swing.event.ChangeEvent;
//import javax.swing.event.ChangeListener;
//
//public class ColorPickerApp extends JFrame {
//    private JSlider rSlider, gSlider, bSlider;
//    private JTextField rField, gField, bField;
//    private JSlider cSlider, mSlider, ySlider, kSlider;
//    private JTextField cField, mField, yField, kField;
//    private JTextField hField, sField, lField;
//    private JSlider hSlider, sSlider, lSlider;
//    private JPanel colorDisplay;
//
//    public ColorPickerApp() {
//        setTitle("Color Picker");
//        setSize(400, 700);
//        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        setLayout(new BorderLayout());
//
//        // Color display panel
//        colorDisplay = new JPanel();
//        colorDisplay.setPreferredSize(new Dimension(400, 200));
//        add(colorDisplay, BorderLayout.NORTH);
//
//        // RGB Fields and Sliders
//        JPanel rgbPanel = new JPanel(new GridLayout(4, 2));
//        rField = createColorField(rgbPanel, "Red");
//        rSlider = createColorSlider(rgbPanel, rField, true);
//        gField = createColorField(rgbPanel, "Green");
//        gSlider = createColorSlider(rgbPanel, gField, true);
//        bField = createColorField(rgbPanel, "Blue");
//        bSlider = createColorSlider(rgbPanel, bField, true);
//        add(rgbPanel, BorderLayout.WEST);
//
//        // CMYK Sliders and Fields
//        JPanel cmykPanel = new JPanel(new GridLayout(2, 5));
//        cField = createColorField(cmykPanel, "C");
//        cSlider = createColorSlider(cmykPanel, cField, false);
//        mField = createColorField(cmykPanel, "M");
//        mSlider = createColorSlider(cmykPanel, mField, false);
//        yField = createColorField(cmykPanel, "Y");
//        ySlider = createColorSlider(cmykPanel, yField, false);
//        kField = createColorField(cmykPanel, "K");
//        kSlider = createColorSlider(cmykPanel, kField, false);
//        add(cmykPanel, BorderLayout.CENTER);
//
//        // HLS Sliders and Fields
//        JPanel hlsPanel = new JPanel(new GridLayout(2, 6));
//        hField = createColorField(hlsPanel, "H");
//        hSlider = createColorSlider(hlsPanel, hField, false);
//        sField = createColorField(hlsPanel, "S");
//        sSlider = createColorSlider(hlsPanel, sField, false);
//        lField = createColorField(hlsPanel, "L");
//        lSlider = createColorSlider(hlsPanel, lField, false);
//        add(hlsPanel, BorderLayout.SOUTH);
//
//        updateColorFromRGB();  // Initialize color display
//    }
//
//    private JSlider createColorSlider(JPanel panel, JTextField linkedField, boolean rgbMode) {
//        JSlider slider = new JSlider(0, 255);
//        slider.addChangeListener(new ChangeListener() {
//            @Override
//            public void stateChanged(ChangeEvent e) {
//                int value = slider.getValue();
//                linkedField.setText(String.valueOf(value));
//                if (rgbMode) {
//                    updateColorFromRGB();
//                } else if (panel.getComponent(0) == cField) {
//                    updateColorFromCMYK();
//                } else {
//                    updateColorFromHLS();
//                }
//            }
//        });
//        panel.add(slider);
//        return slider;
//    }
//
//    private JTextField createColorField(JPanel panel, String label) {
//        JTextField textField = new JTextField();
//        textField.setEditable(false);
//        panel.add(new JLabel(label));
//        panel.add(textField);
//        return textField;
//    }
//
//    private void updateColorFromRGB() {
//        int r = rSlider.getValue();
//        int g = gSlider.getValue();
//        int b = bSlider.getValue();
//
//        updateColorDisplay(r, g, b);
//        updateCMYK(r, g, b);
//        updateHLS(r, g, b);
//    }
//
//    private void updateColorFromCMYK() {
//        float c = cSlider.getValue() / 255f;
//        float m = mSlider.getValue() / 255f;
//        float y = ySlider.getValue() / 255f;
//        float k = kSlider.getValue() / 255f;
//
//        int[] rgb = cmykToRgb(c, m, y, k);
//        rSlider.setValue(rgb[0]);
//        gSlider.setValue(rgb[1]);
//        bSlider.setValue(rgb[2]);
//
//        updateColorDisplay(rgb[0], rgb[1], rgb[2]);
//        updateHLS(rgb[0], rgb[1], rgb[2]);
//    }
//
//    private void updateColorFromHLS() {
//        float h = hSlider.getValue() / 255f;
//        float s = sSlider.getValue() / 255f;
//        float l = lSlider.getValue() / 255f;
//
//        int[] rgb = hlsToRgb(h, s, l);
//        rSlider.setValue(rgb[0]);
//        gSlider.setValue(rgb[1]);
//        bSlider.setValue(rgb[2]);
//
//        updateColorDisplay(rgb[0], rgb[1], rgb[2]);
//        updateCMYK(rgb[0], rgb[1], rgb[2]);
//    }
//
//    private void updateColorDisplay(int r, int g, int b) {
//        colorDisplay.setBackground(new Color(r, g, b));
//        rField.setText(String.valueOf(r));
//        gField.setText(String.valueOf(g));
//        bField.setText(String.valueOf(b));
//    }
//
//    private void updateCMYK(int r, int g, int b) {
//        float[] cmyk = rgbToCmyk(r, g, b);
//        cField.setText(String.format("%.2f", cmyk[0] * 255));
//        mField.setText(String.format("%.2f", cmyk[1] * 255));
//        yField.setText(String.format("%.2f", cmyk[2] * 255));
//        kField.setText(String.format("%.2f", cmyk[3] * 255));
//
//        // Обновление ползунков CMYK
//        cSlider.setValue((int) (cmyk[0] * 255));
//        mSlider.setValue((int) (cmyk[1] * 255));
//        ySlider.setValue((int) (cmyk[2] * 255));
//        kSlider.setValue((int) (cmyk[3] * 255));
//    }
//
//    private void updateHLS(int r, int g, int b) {
//        float[] hls = rgbToHls(r, g, b);
//        hField.setText(String.format("%.2f", hls[0] * 255));
//        sField.setText(String.format("%.2f", hls[1] * 255));
//        lField.setText(String.format("%.2f", hls[2] * 255));
//
//        // Обновление ползунков HLS
//        hSlider.setValue((int) (hls[0] * 255));
//        sSlider.setValue((int) (hls[1] * 255));
//        lSlider.setValue((int) (hls[2] * 255));
//    }
//
//    private float[] rgbToCmyk(int r, int g, int b) {
//        float c = 1 - (r / 255f);
//        float m = 1 - (g / 255f);
//        float y = 1 - (b / 255f);
//        float k = Math.min(c, Math.min(m, y));
//        if (k < 1) {
//            c = (c - k) / (1 - k);
//            m = (m - k) / (1 - k);
//            y = (y - k) / (1 - k);
//        } else {
//            c = m = y = 0;
//        }
//        return new float[]{c, m, y, k};
//    }
//
//    private float[] rgbToHls(int r, int g, int b) {
//        float rPrime = r / 255f;
//        float gPrime = g / 255f;
//        float bPrime = b / 255f;
//
//        float max = Math.max(rPrime, Math.max(gPrime, bPrime));
//        float min = Math.min(rPrime, Math.min(gPrime, bPrime));
//        float h, l = (max + min) / 2;
//        float s;
//
//        if (max == min) {
//            h = s = 0; // achromatic
//        } else {
//            float delta = max - min;
//            s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);
//            if (max == rPrime) {
//                h = (gPrime - bPrime) / delta + (gPrime < bPrime ? 6 : 0);
//            } else if (max == gPrime) {
//                h = (bPrime - rPrime) / delta + 2;
//            } else {
//                h = (rPrime - gPrime) / delta + 4;
//            }
//            h /= 6;
//        }
//        return new float[]{h, s, l};
//    }
//
//    private int[] cmykToRgb(float c, float m, float y, float k) {
//        int r = (int) (255 * (1 - c) * (1 - k));
//        int g = (int) (255 * (1 - m) * (1 - k));
//        int b = (int) (255 * (1 - y) * (1 - k));
//        return new int[]{r, g, b};
//    }
//
//    private int[] hlsToRgb(float h, float s, float l) {
//        float r, g, b;
//
//        if (s == 0) {
//            r = g = b = l; // achromatic
//        } else {
//            float q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//            float p = 2 * l - q;
//            r = hueToRgb(p, q, h + 1f / 3);
//            g = hueToRgb(p, q, h);
//            b = hueToRgb(p, q, h - 1f / 3);
//        }
//        return new int[]{(int) (r * 255), (int) (g * 255), (int) (b * 255)};
//    }
//
//    private float hueToRgb(float p, float q, float t) {
//        if (t < 0) t += 1;
//        if (t > 1) t -= 1;
//        if (t < 1f / 6) return p + (q - p) * 6 * t;
//        if (t < 1f / 2) return q;
//        if (t < 2f / 3) return p + (q - p) * (2f / 3 - t) * 6;
//        return p;
//    }
//
//    public static void main(String[] args) {
//        SwingUtilities.invokeLater(() -> {
//            ColorPickerApp app = new ColorPickerApp();
//            app.setVisible(true);
//        });
//    }
//}
