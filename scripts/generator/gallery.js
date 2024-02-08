/**
 * Created by wleelw on 2024/2/4.
 */

hexo.extend.generator.register('gallery', function (locals) {
    if (!hexo.theme.config.album.enable) return;
    const album = locals.data.gallery.gallery;
    if (!album) return;
    const { url, cover, comment, title, album_list, descr, rightbtn, rightbtnlink } = album;
    return {
        path: `${url}/index.html`,
        layout: ['page'],
        data: {
            url,
            cover,
            type: 'gallery',
            comment,
            desc: title,
            title,
            album: album_list,
            leftend: descr,
            rightbtn,
            rightbtnlink
        }
    };
});

hexo.extend.generator.register('album', function (locals) {
    if (!hexo.theme.config.album.enable) return;
    const album = locals.data.gallery.gallery;
    let back = hexo.config.language === 'zh-CN' ? '返回相册' : hexo.config.language === 'zh-TW' ? '返回相冊' : 'Back to Album';
    if (!album) return;
    const albumPages = album.album_list.map(item => ({
        path: `${album.url}/${item.album}/index.html`,
        layout: ['page'],
        data: {
            album: item,
            type: 'album',
            cover: item.cover,
            title: item.class_name,
            desc: item.class_name,
            leftend: item.descr,
            rightbtn: back,
            rightbtnlink: `/${album.url}/`,
            comment: item.comment
        }
    }));
    return albumPages;
});