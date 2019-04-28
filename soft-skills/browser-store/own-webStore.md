# 浏览器缓存（http缓存）知识点总结

1. 浏览器缓存分为强缓存和协商缓存；
2. 强缓存通过expires标识资源是否过期，expires表示资源过期时间，其值等于max-age + 请求时间；
3. cache-control同样用于标识资源缓存，优先级比expires更高；
5. cache-control的取值可以是public private no-cache no-store max-age，public表示浏览器和服务端都可以缓存资源，private表示浏览器可以缓存资源，no-cache表示浏览器都会发起请求到服务端，服务端通过协商缓存标识决定是返回新内容还是允许浏览器读取缓存，no-store则表示无论什么时候都不会缓存内容，max-age则表示在这个时间段内都是可以使用缓存；
6. 协商缓存，通过last-modified和etag标识缓存是否过期；
7. 请求到达服务器后，服务器在返回资源的同时，还会返回last-modified标识，表示资源最后修改时间；
8. 浏览器把last-modified缓存起来，下次请求时候添加last-modified-since字段，值就是缓存的last-modified值；
9. last-modified有个缺点就是只能精确到秒，所以其无法识别同一秒钟的多次修改，这一秒返回了资源时间，一秒内修改了多次，但是下次请求判断的还是当前秒数的资源，所以资源不会更新；
10. etag用于解决上述问题，因为etag是由服务端通过某种手段计算出来的一个资源唯一标识，可以是资源修改时间戳的哈希值，或者资源的版本号等等；
11. 每次请求，浏览器会添加一个if-none-match字段，值为缓存的etag值，服务端会根据资源计算出一个新的etag值，如果两个值相等，则标识资源没有更新，返回304和空的响应正文，浏览器读取缓存值，如果不相等，标识资源有更新，返回200和新的资源内容，浏览器再次缓存并且更新etag值；
12. etag优先级高于last-modified，而且精度要高于last-modified，但是因为每次服务器都会进行读写操作，因为要读取资源进行etag值的计算，所以会影响服务器的性能；

缓存过程：强缓存->根据cache-coontrol决定是否使用协商缓存->如果cache-control值不为no-cache或者no-store，则不需要立刻使用协商缓存->而是判断expires是否过期，没过期的话直接读取缓存内容，如果过期，则服务端发起请求->如果cache-control值为no-cache或者no-store，则直接向服务器发起请求->如果存在last-modified值则带上last-modified-since字段，如果存在etag值则带上if-none-match字段，后者优先级更高->服务端根据两个字段存在与否，如果存在if-none-match,则计算etag比较，一致的话返回304，不一致返回新的内容和200->如果只存在last-modified-since，则根据时间判断是否过期，没有过期返回304，过期返回新的资源正文和200->浏览器根据响应决定读取缓存或者更新资源
