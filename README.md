# duayen.siber

Abdullah Alper BAŞ'ın küçük işletmelere yönelik yazılım portföyü. [Seçili çalışmalar](https://alperdigital.github.io/siber/#portfoy) arasında kurgusal kayıtlarla çalışan bir servis takip panosu, bir klinik web sitesi ve kişisel sosyal medya rehberi bulunur. GitHub Pages bu dalın kök dizinini yayımlar.

## Yerelde çalıştırma

Depo dizininden Python 3 ile statik sunucuyu başlatın.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

[Yerel siteyi açın](http://localhost:8000/).

## Site yapısı

- `index.html` portföyü, hizmetleri, MVP teklif formunu, etkileşimli sosyal medya çözüm rehberini, sık sorulan soruları ve iletişim bilgilerini içerir.
- `studio.css`, `portfolio.css` ve `offer.css` ana sayfayı biçimlendirir. `portfolio.js` rehberin platform seçimini ve proje özetinin e-postaya, WhatsApp’a veya panoya aktarılmasını yönetir.
- `demo/` tarayıcıda çalışan talep takip örneğini, `abdullah-alper-bas.vcf` indirilebilir dijital kartviziti içerir.
- `site.css`, `portrait-overlay.css` ve `mirror-slat.js` mevcut görsel efektlerini sağlar.
- `assets/` portföy için üretilen WebP görsellerini içerir.
