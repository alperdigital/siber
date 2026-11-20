# duayen.siber

Abdullah Alper BAŞ'ın yazılım portföyü, hizmet vitrini, MVP teklif formu ve sosyal medya güvenliği hakkında Türkçe soru-cevap sitesi.

## Yerelde çalıştırma

Depo dizininden Python 3 ile statik sunucuyu başlatın.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

[Yerel siteyi açın](http://localhost:8000/).

## Site yapısı

- `index.html` portföyü, hizmetleri, MVP teklif formunu, etkileşimli sosyal medya çözüm rehberini, sık sorulan soruları ve iletişim bilgilerini içerir.
- `portfolio.css` portföyün görsel düzenini, `portfolio.js` rehberin platform seçimini ve e-posta teklif taslağının hazırlanmasını yönetir.
- `site.css`, `portrait-overlay.css` ve `mirror-slat.js` mevcut görsel efektlerini sağlar.
- `assets/` portföy için üretilen WebP görsellerini içerir.
