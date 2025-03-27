export class FileProcess {
  static DownloadUrl(url: string, nameFile: string, isTargetBlank = false) {
    const link = document.createElement('a');
    link.href = url;
    link.download = nameFile;
    link.target = isTargetBlank ? '_blank' : '_self';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static getBase64(file: File): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split('base64,')[1]);
      reader.onerror = (error) => reject(error);
    });
  }
}