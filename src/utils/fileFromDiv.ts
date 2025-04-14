/**
 * 将包含图片的 div（其内联 transform 包含旋转和缩放参数）转换为 File 对象
 *
 * transform 示例："rotate(90deg) scale(0.5)"
 *
 * @param div 一个 HTMLDivElement，其中包含一个 <img> 元素，且 div 的内联 transform 同时设置了旋转和缩放信息
 * @returns 返回一个 Promise，成功后 resolve 经过旋转和缩放处理的图片 File 对象
 */
export function getFileFromDiv(div: HTMLDivElement): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!div) {
      reject(new Error("未传入有效的 div 元素"));
      return;
    }

    // 默认旋转角度和缩放比率
    let rotation = 0;
    let scale = 1;

    // 从 div 的内联 transform 样式中提取旋转和缩放信息
    const transformStr = div.style.transform; // 例如 "rotate(90deg) scale(0.5)"
    if (transformStr) {
      // 提取旋转角度（单位：deg）
      const rotateMatch = transformStr.match(/rotate\(([-\d]+)deg\)/);
      if (rotateMatch) {
        rotation = parseFloat(rotateMatch[1]);
      }

      // 提取缩放比例（scale默认为均匀缩放）
      const scaleMatch = transformStr.match(/scale\(([\d]+)\)/);
      if (scaleMatch) {
        scale = parseFloat(scaleMatch[1]);
      }
    }

    // 从 div 内部查找 <img> 元素
    const imgEl = div.querySelector("img") as HTMLImageElement | null;
    if (!imgEl) {
      reject(new Error("div 内未找到 img 元素"));
      return;
    }

    // 获取图片的原始尺寸
    const imgWidth = imgEl.naturalWidth;
    const imgHeight = imgEl.naturalHeight;

    // 角度转换为弧度
    const rad = (rotation * Math.PI) / 180;

    /* 
        计算旋转和缩放后图片的边界尺寸：
        当你对一个矩形执行旋转变换后，其包围盒（bounding box）的宽度及高度可用下面公式计算：
          finalWidth  = |w * cosθ| + |h * sinθ|
          finalHeight = |w * sinθ| + |h * cosθ|
        这里再乘以缩放值以得到最终尺寸
      */
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const finalWidth =
      Math.abs(imgWidth * scale * cos) + Math.abs(imgHeight * scale * sin);
    const finalHeight =
      Math.abs(imgWidth * scale * sin) + Math.abs(imgHeight * scale * cos);

    // 创建 canvas 并设定尺寸
    const canvas = document.createElement("canvas");
    canvas.width = finalWidth;
    canvas.height = finalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("无法获取 canvas 上下文"));
      return;
    }

    // 设置 canvas 坐标原点为画布中心，
    // 然后依次进行旋转和缩放变换，最后绘制图片时将图片中心对齐到原点
    ctx.translate(finalWidth / 2, finalHeight / 2);
    ctx.rotate(rad);
    ctx.scale(scale, scale);
    ctx.drawImage(imgEl, -imgWidth / 2, -imgHeight / 2);

    // 将 canvas 内容导出为 Blob，并构造出 File 对象
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "transformed-image.png", {
          type: blob.type,
        });
        resolve(file);
      } else {
        reject(new Error("转换为 Blob 失败"));
      }
    }, "image/png");
  });
}
