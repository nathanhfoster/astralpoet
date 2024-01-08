const fileToBase64String = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (!file) return;
    const blob = new Blob([file]);
    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64 = <string>reader.result;

      resolve(base64);
    };
    reader.onerror = reject;
  });

export default fileToBase64String;
