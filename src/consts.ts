export const vec3Samples = {
  get zeros() {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  },
  get ones() {
    return {
      x: 1,
      y: 1,
      z: 1,
    };
  },
  get random() {
    return {
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    };
  },
};
