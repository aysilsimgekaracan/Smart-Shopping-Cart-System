import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Canvas } from "react-native-pytorch-core";

const objectColors = [
  "#FF3B30",
  "#5856D6",
  "#34C759",
  "#007AFF",
  "#FF9500",
  "#AF52DE",
  "#5AC8FA",
  "#FFCC00",
  "#FF2D55",
];

const textBaselineAdjustment = Platform.OS == "ios" ? 7 : 4;

export default function ResultsScreen({ image, boundingBoxes, onReset }) {
  const [ctx, setCtx] = useState(null);
  const [layout, setLayout] = useState(null);

  // This is a drawImage function wrapped in useCallback (for improving render performance)
  useEffect(
    () => {
      if (ctx != null && layout != null && image != null) {
        ctx.clearRect(0, 0, layout.width, layout.height);

        // Scale image to fit screen
        const imageWidth = image.getWidth();
        const imageHeight = image.getHeight();
        const scale = Math.max(
          layout.width / imageWidth,
          layout.height / imageHeight
        );
        const displayWidth = imageWidth * scale;
        const displayHeight = imageHeight * scale;
        const offsetX = (layout.width - displayWidth) / 2;
        const offsetY = (layout.height - displayHeight) / 2;
        ctx.drawImage(image, offsetX, offsetY, displayWidth, displayHeight);

        // draw bounding boxes and label them, if provided
        if (boundingBoxes) {
          ctx.font = `13px monospace`;
          ctx.fillStyle = "#000";
          ctx.textAlign = "left";

          boundingBoxes.forEach((boundingBox, index) => {
            const { objectClass, bounds } = boundingBox;
            const x = offsetX + bounds[0] * scale;
            const y = offsetY + bounds[1] * scale;
            const w = bounds[2] * scale;
            const h = bounds[3] * scale;

            const boxColor = objectColors[index % objectColors.length];
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.stroke();

            const textHorizontalPadding = 10;
            const textWidth =
              objectClass.length * 6 + 2 * textHorizontalPadding;
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 25;
            ctx.lineCap = "round";
            ctx.beginPath();
            const textStartX = x + w / 2 - textWidth / 2;
            ctx.moveTo(textStartX, y);
            ctx.lineTo(textStartX + textWidth, y);
            ctx.stroke();

            ctx.fillStyle = "#fff";
            ctx.fillText(objectClass, textStartX, y + textBaselineAdjustment);
          });
          ctx.invalidate();
        }
      }
    },
    [ctx, layout, image, boundingBoxes] // dependencies for useCallback
  );
  return (
    <View style={styles.container}>
      <Canvas
        style={StyleSheet.absoluteFill}
        onLayout={(event) => {
          setLayout(event.nativeEvent.layout);
        }}
        onContext2D={setCtx}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onReset} style={styles.resetButton}>
          <Text style={styles.buttonLabel}>Take another picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  buttonLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
