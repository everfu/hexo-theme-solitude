/**
 * Created by wleelw on 2024/2/4.
 */

hexo.extend.generator.register('gallery', function (locals) {
    if (!hexo.theme.config.album.enable) return;
    const album = locals.data.gallery.gallery;
    if (!album) return;
    return {
        path: album.url + '/index.html', layout: ['page'], data: {
            url: album.url,
            cover: album.cover,
            type: 'gallery',
            comment: album.comment,
            desc: album.title,
            title: album.title,
            album: album.album_list,
            leftend: album.descr,
            rightbtn: album.rightbtn,
            rightbtnlink: album.rightbtnlink
        }
    }
});

hexo.extend.generator.register('album', function (locals) {
    if (!hexo.theme.config.album.enable) return;
    const album = locals.data.gallery.gallery;
    let back = hexo.config.language === 'zh-CN' ? '返回相册' : hexo.config.language === 'zh-TW' ? '返回相冊' : 'Back to Album';
    if (!album) return;
    const albumPages = [];
    album.album_list.forEach(function (item) {
        albumPages.push({
            path: album.url + '/' + item.album + '/index.html', layout: ['page'], data: {
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
        });
    });
    return albumPages;
});