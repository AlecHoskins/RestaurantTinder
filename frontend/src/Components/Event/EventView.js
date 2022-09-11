import React from "react";
import './EventView.css';

export default function EventView() {

    const dummyData = [{"id":"SCxEMLXGhbVpoQRIv4bOdg","name":"Anong's","categories":[{"alias":"thai","title":"Thai"}],"location":{"address1":"101 E Ivinson Ave","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077456262","hours":null,"closed":false,"image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/dulTbK6KQKrvJ-hsMzbhfw/o.jpg","is_closed":false,"display_phone":"(307) 745-6262"},{"id":"86T-CAGwj9aclTnOfxPOzg","name":"Thai Spice","categories":[{"alias":"thai","title":"Thai"}],"location":{"address1":"204 S 3rd St","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13074603440","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/oD1l2Qq83VDCedRufmepOg/o.jpg","is_closed":false,"display_phone":"(307) 460-3440"},{"id":"EbA1nez8RPB8kFYBKFZGfQ","name":"The New Mandarin","categories":[{"alias":"chinese","title":"Chinese"}],"location":{"address1":"1254 N 3rd St","city":"Laramie","state":"WY","zip_code":"82072"},"phone":"+13077428822","hours":null,"closed":false,"image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/i_yuaae7NcOgtXbCk5lquw/o.jpg","is_closed":false,"display_phone":"(307) 742-8822"},{"id":"VXagSQWvu9sKKtujh5S6Zw","name":"Sweet Melissa's","categories":[{"alias":"vegetarian","title":"Vegetarian"},{"alias":"bars","title":"Bars"},{"alias":"cafes","title":"Cafes"}],"location":{"address1":"213 S 1st St","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077429607","hours":null,"closed":false,"image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/3eO14T91ahdyleL_27MdTw/o.jpg","is_closed":false,"display_phone":"(307) 742-9607"},{"id":"H2kyfGjQJZYoZdNMQvP3zQ","name":"Speedgoat","categories":[{"alias":"mexican","title":"Mexican"},{"alias":"asianfusion","title":"Asian Fusion"},{"alias":"tex-mex","title":"Tex-Mex"}],"location":{"address1":"213 Grand Ave","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13074603396","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/EtTVx2PEQl9eSLv41-PcTw/o.jpg","is_closed":false,"display_phone":"(307) 460-3396"},{"id":"anFMxAcBOHOI26tzDU8GgQ","name":"Sushi Boat","categories":[{"alias":"sushi","title":"Sushi Bars"},{"alias":"korean","title":"Korean"},{"alias":"japanese","title":"Japanese"}],"location":{"address1":"421 Boswell Dr","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077420355","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/klyjQ_ttXngACO1LSQtr9A/o.jpg","is_closed":false,"display_phone":"(307) 742-0355"},{"id":"ErnRwQoJGrePU4FBpMDDng","name":"Jeffrey's Bistro","categories":[{"alias":"salad","title":"Salad"},{"alias":"soup","title":"Soup"},{"alias":"sandwiches","title":"Sandwiches"}],"location":{"address1":"123 E Ivinson Ave","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077427046","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/Iqjh5BNJZcP7dOvACSeIyg/o.jpg","is_closed":false,"display_phone":"(307) 742-7046"}];
    const tuBlack = '/thumbsupblack.png';
    const tuGreen = '/thumbsupgreen.png';
    const tdBlack = '/thumbsdownblack.png';
    const tdRed = '/thumbsdownred.png';
    const phoneLogo = '/phone-icon.png';
    const blob = '/yellowblobsignup.png';

    //Maps through restaurants to display on page
    const eventRestaurantCards = function() {
        return (
            dummyData.map(card => (
                <div className="restaurantCard" key={card.id}>
                    <div className="titleSection">
                        <h5 className="card-name">{card.name}</h5>
                    </div>
                    <div className="thumbs">
                            <img src={tuBlack} alt="Thumbs Up"/>
                            <img src={tdBlack} alt="Thumbs Down"/>
                    </div>
                    <div className="imageSection">
                        <img className="card-img" src={card.image_url} alt="Restaurant Image" />
                    </div>
                    <div className="infoSection">
                        <div className="address">
                            <div>{card.location.address1}</div>
                            <div>{card.location.city}, {card.location.state} {card.location.zipcode}</div> 
                        </div>
                        <div className="restaurant-phone">
                            <img src={phoneLogo} className="phoneLogo" alt="📞" />
                            <a className="telephone-link" href={`tel:${card.phone}`}>{card.phone}</a>
                        </div>
                        <div className="categories">
                            {(card.categories.map((e) => (<span className="category" key={e.alias}>{e.title}</span>)))}
                        </div>
                    </div>
                </div> 
        )))
    }

    return (
        <div className="eventView">
            <div>
                <img src={blob} className='blob' alt='Yellow Blob'/>
            </div>
            <div className="eventCard">
                <div className="eventInfo">
                    {/* If a User is a guest*/}
                    <h1>Welcome, userGuest!</h1>
                    {/* */}
                    <h1>Event Title</h1>
                    <h2>Event Date and Time</h2>
                    <h2>Event Due Date</h2>
                    <a>How do I start?</a>
                    {/* User is the Event Creator */}
                    <button className="eventEdit">Edit Event</button>
                    {/* */}
                    <button className="eventSubmit">Submit</button>
                </div>
                <div className="eventRestaurants">
                    {eventRestaurantCards()}
                </div>
            </div>
        </div>
    )
}