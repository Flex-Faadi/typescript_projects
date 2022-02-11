import React from 'react'

function MenuCard({ menuData }:any) {
    return (
        <>
          <section className="Restaurant-main-card--cointainer">
            {menuData.map((curElem:any) => {
              const { id, name, category, image, description } = curElem;
    
              return (
                <>
                  <div className="Restaurant-card-container" key={id}>
                    <div className="Restaurant-card">
                      <div className="Restaurant-card-body">
                        <span className="card-number Restaurant-card-circle subtle">{id}</span>
                        <span className="card-author subtle"> {category}</span>
                        <h2 className="Restaurant-card-title"> {name} </h2>
                        <span className="Restaurant-card-description subtle">
                          {description}
                        </span>
                        <div className="card-read">Read</div>
                      </div>
                      <img src={image} alt="images" className="card-media" />
    
                      <span className="card-tag  subtle">Order Now</span>
                    </div>
                  </div>
                </>
              );
            })}
          </section>
        </>
      );
}

export default MenuCard