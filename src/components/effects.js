import { useLoader } from 'react-three-fiber';
import {
  VignetteEffect,
  BloomEffect,
  SMAAImageLoader,
  BlendFunction,
  NoiseEffect,
  SMAAEffect,
  KernelSize,
} from 'postprocessing';

const BLOOM = new BloomEffect({
  opacity: 1,
  blendFunction: BlendFunction.SCREEN,
  kernelSize: KernelSize.LARGE,
  luminanceThreshold: 0.5,
  luminanceSmoothing: 0.2,
  height: 300,
});

const NOISE = new NoiseEffect({
  blendFunction: BlendFunction.COLOR_DODGE,
});
NOISE.blendMode.opacity.value = 0.1;

const VIGNETTE = new VignetteEffect({
  offset: 0.5,
  darkness: 0.8,
});

const VIGNETTE_OUT = new VignetteEffect({
  offset: 0.5,
  darkness: 0.5,
});

const aOconfig = {
  blendFunction: BlendFunction.MULTIPLY,
  samples: 3, // May get away with less samples
  rings: 4, // Just make sure this isn't a multiple of samples
  distanceThreshold: 0.4,
  distanceFalloff: 0.5,
  rangeThreshold: 1, // Controls sensitivity based on camera view distance **
  rangeFalloff: 0.01,
  luminanceInfluence: 0.6,
  radius: 7, // Spread range
  intensity: 5,
  bias: 0.5,
};

export { aOconfig, VIGNETTE, VIGNETTE_OUT, NOISE, BLOOM };
