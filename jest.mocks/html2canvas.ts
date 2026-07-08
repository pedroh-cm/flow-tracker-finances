const html2canvas = jest.fn().mockResolvedValue({
  toDataURL: () => "data:image/png;base64,mock",
  width: 800,
  height: 600,
});

export default html2canvas;
