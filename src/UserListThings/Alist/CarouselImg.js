import React from "react";
import { Carousel } from "react-bootstrap";

function GetCarouselItem(i, itemsInGroup) {
    const renderImg = (image, index) => (<img
        key={image}
        src={image}
        className="d-block"
        style={{ width: '33.33%' }} // 设置每个图片的宽度
        alt={`Slide ${index}`} />);
    return <Carousel.Item key={i}>
        <div className="d-flex justify-content-between">
            {itemsInGroup.map(renderImg)}
        </div>
    </Carousel.Item>;
}

function getCarouselList(images = []) {
    // 计算轮播图子项的数量
    const itemCount = Math.ceil(images.length / 3);

    // 生成每组轮播图子项
    const result = [];

    for (let i = 0; i < itemCount; i++) {
        // Indexes
        const startIndex = i * 3;
        const itemsInGroup = images.slice(startIndex, startIndex + 3);
        // Action
        result.push( GetCarouselItem(i, itemsInGroup) );
    }
    return result;
}

function CarouselImg() {
    // 假设这里有一个图片数组，包含所有要在轮播图中显示的图片
    const images = [
        'https://img.freepik.com/free-photo/gyeongbokgung-palace-autumn-south-korea_335224-1366.jpg?t=st=1710997273~exp=1711000873~hmac=9c9e053521d6b6d25c5a42850d2a3d2c08cfea9e0d7b354b4dba36c10bfb76af&w=1380',
        'https://img.freepik.com/free-photo/tung-bua-tong-mexican-sunflower-field-sunset-mae-hong-son-province-thailand_335224-819.jpg?t=st=1710997208~exp=1711000808~hmac=742627edc116e276d6ee5a22318b06665aee9b4500a7638fb6312260a54a8c73&w=1380',
        'https://img.freepik.com/free-photo/row-yellow-ginkgo-tree-autumn-autumn-park-tokyo-japan_335224-33.jpg?t=st=1710997245~exp=1711000845~hmac=3b14497f83c357d446890af91fb9b8d356fdceb7467ceccd3c562b1fef9584c2&w=1380',
        'https://img.freepik.com/free-photo/beautiful-cherry-blossoms-trees-blooming-spring_335224-878.jpg?t=st=1710997828~exp=1711001428~hmac=aae9818d2e1bddf2a5efa5dd10121df7b6c89febe2af119d108ae32794889569&w=1380',
        'https://img.freepik.com/free-photo/gyeongbukgung-maple-tree-autumn-korea_335224-357.jpg?t=st=1710997872~exp=1711001472~hmac=db5137fda31d863e3a9036a59c5c57a220623eca234efbfda52904e8b0f0199f&w=1380',
        'https://img.freepik.com/free-photo/colorful-leaves-autumn-beautiful-park-japan_335224-59.jpg?t=st=1710997905~exp=1711001505~hmac=498b63a6a9abef2d73089bafcbfba59c2e655e896b096e5fa9213bdc1a3e90f5&w=1380',
        'https://img.freepik.com/free-photo/autumn-gyeongbokgung-palace-seoul-south-korea_335224-371.jpg?t=st=1710998836~exp=1711002436~hmac=914bcf43610122027bf8eb62a92b21cc58b24efb6a47d6b6a4de6ce8adf2c399&w=1380',
        'https://img.freepik.com/free-photo/dock-pier-sea-twilight-long-exposure_1150-10769.jpg?t=st=1710998865~exp=1711002465~hmac=b2bf2fcce62011263152e1c1bcd0784e0b7a5db982d0a3f0bc333f8ef542938e&w=1380',
        'https://img.freepik.com/free-photo/byodo-temple_74190-5423.jpg?t=st=1710998887~exp=1711002487~hmac=2d2da693f0f41980ad146325a1e6bdcd272b3d079476b68c443d562f8a6d5a89&w=1380',
        'https://img.freepik.com/free-photo/cherry-blossoms-fuji-mountain-spring-sunrise-shizuoka-japan_335224-110.jpg?t=st=1710998925~exp=1711002525~hmac=32f6d6ab165f9cfcb3422649f5cc4264e2a6b87cde94c7510d83fb018a456f4b&w=1380',
        'https://img.freepik.com/free-photo/beautiful-landscape_74190-3074.jpg?t=st=1710998998~exp=1711002598~hmac=2839cd826713032dc8bd5277e9280aa5ac803dbf8041bd38feea00a0328cc167&w=1380',
        'https://img.freepik.com/free-photo/kinkakuji-temple-golden-pavilion-kyoto-japan_1232-2294.jpg?t=st=1710999027~exp=1711002627~hmac=214632d565f124cdd532c4641e4e0a3d2dd13fae76ec9a508e42d8f80e5fcae5&w=1380'
    ];
    return (<Carousel> {getCarouselList(images)} </Carousel>);
}

export default CarouselImg;


