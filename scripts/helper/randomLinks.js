hexo.extend.helper.register('randomLinks', function(){
    const links = []
    const data = this.site.data.links.links
    if(!data)return
    data.forEach(x => {
        if(x.type === "item"){
            x.link_list.forEach(y => {
                links.push({
                    name: y.name,
                    link: y.link
                })
            })
        }
    });
    return `<script>const links=${JSON.stringify(links)};function travelling(){const link=links[utils.randomNum(links.length)];utils.snackbarShow('您即将前往 ⌈ '+link.name+' ⌋ , 安全性未知',false,3000);setTimeout(()=>{window.open(link.link,"_blank")},3000)};function randomLinksList(){let data='';for(let i=1;i<=3;i++){const link=links[utils.randomNum(links.length)];data+='<a class="footer-item" href="'+link.link+'" target="_blank" rel="noopener nofollow">'+link.name+'</a>'};document.getElementById('friend-links-in-footer').innerHTML=data + '<a class="footer-item" href="/links/">更多</a>'};</script>`
})