const firebaseConfig = {
    apiKey: "AIzaSyCCiNyYhoTM-8JDFoQnM_R7FfDIg61g6dQ",
    authDomain: "purchase-box.firebaseapp.com",
    databaseURL: "https://purchase-box.firebaseio.com",
    projectId: "purchase-box",
    storageBucket: "purchase-box.appspot.com",
};
  firebase.initializeApp(firebaseConfig);

$(function(){
    const database = firebase.database();
    const selection = database.ref('selection/');

    /* --------------------------------
    * Notification
    * -------------------------------- */
    const Notification = (message) =>{
        if(message == 'fill-all'){
            $('.fill-all').fadeIn(1000);
        
            setTimeout(function(){
                $('.fill-all').fadeOut(1000);
            },3500);
        }
    
        if(message == 'inserted successfully'){
            $('.inserted').fadeIn(1000);
        
            setTimeout(function(){
                $('.inserted').fadeOut(1000);
            },3500);
        }

        if(message == 'updated'){
            $('.updated').fadeIn(1000);
        
            setTimeout(function(){
                $('.updated').fadeOut(1000);
            },3500);
        }
    }

    /* --------------------------------
    * Add Product
    * -------------------------------- */
    $('[name=submit]').click(function(e){
        e.preventDefault();

        const category = $('[name=category]').val(),
                  size = $('[name=size]').val(),
           capacitance = $('[name=capacitance]').val(),
               voltage = $('[name=voltage]').val(),
                 price = $('[name=price]').val(),
                 image = $('[name=image]').val().slice(12),
                 newId = selection.push();
   
        if(!size || !capacitance || !voltage || !price || !image){
            Notification('fill-all');
        } else {
            newId.set({
                category : category,
                    size : size,
               capacitance : capacitance,
                 voltage : voltage, 
                   price : price,
                   image : "img/"+image
            },
            function(error){
                if(!error){
                    Notification("inserted successfully");
                    $('[name=size]').val("");
                    $('[name=capacitance]').val("");
                    $('[name=voltage]').val("");
                    
                    $('[name=price]').val("");
                    $('[name=image]').val("");
                } else {
                    console.log("Not saved");
                }
            });
        }
    });

    /* --------------------------------
    * Send data to Database
    * -------------------------------- */
    selection.on('value', function success(data){
       if(data){
           let first = "",
              second = "",
               third = "";
        
            $.each(data.val(),function(key, value){
                let id = key,
                category = value['category'],
                    size = value['size'],
             capacitance = value['capacitance'],
                 voltage = value['voltage'],
                   price = value['price'],
                   image = value['image'];

                if(category == 'first'){                   
                    first += `<div class="product-box">
                                <div id= "${key}">
                                    <div class="product-image">
                                        <img class="image" src="${image}">
                                    </div>
                                    <div class="size">直径 : ${size}[mm]</div>                                 
                                    <div class="capacitance">静電容量 : ${capacitance}[μF]</div>                                 
                                    <div class="voltage">定格電圧 : ${voltage}[V]</div>                                   
                                    <div class="price">価格 : ${price}円</div>                                
                                    <div class="product-icon">
                                        <div data-id="${key}" class="delete"></div>
                                        <div data-id="${key}" class="update"></div>
                                    </div>
                                </div>
                            </div>`;
                } 
                else if(category == 'second')
                {                   
                    second += `<div class="product-box">
                                <div id= "${key}">
                                    <div class="product-image">
                                        <img class="image" src="${image}">
                                    </div>
                                    <div class="size">サイズ規格 : ${size}</div>                                 
                                    <div class="capacitance">静電容量 : ${capacitance}[μF]</div>                                 
                                    <div class="voltage">定格電圧 : ${voltage}[V]</div>                                   
                                    <div class="price">価格 : ${price}円</div>                                
                                    <div class="product-icon">
                                        <div data-id="${key}" class="delete"></div>
                                        <div data-id="${key}" class="update"></div>
                                    </div>
                                </div>
                            </div>`;
                } 
                else if(category == 'third')
                {                   
                    third += `<div class="product-box">
                                <div id= "${key}">
                                    <div class="product-image">
                                        <img class="image" src="${image}">
                                    </div>
                                    <div class="size">直径 : ${size}[mm]</div>                                 
                                    <div class="capacitance">公称容量 : ${capacitance}[mAh]</div>
                                    <div class="voltage">公称電圧 : ${voltage}[V]</div>                                   
                                    <div class="price">価格 : ${price}円</div>                               
                                    <div class="product-icon">
                                        <div data-id="${key}" class="delete"></div>
                                        <div data-id="${key}" class="update"></div>
                                    </div>
                                </div>
                            </div>`;
                }
            });

            $('.first').html(first);
            $('.second').html(second);
            $('.third').html(third);

            /* --------------------------------
            * Delete data of Database
            * -------------------------------- */
            $('.delete').click(function(){
                
                let thekey = $(this).data('id');
                
                selection.child(thekey).remove();
            });
            
            /* --------------------------------
            * Updata data of Database
            * -------------------------------- */
            $('#close-update').click(function(){
                $('#for-update').slideUp();
                $('#header').slideDown();
            });

            $('.update').click(function(){
                
                let thekey = $(this).data('id');

                $('#header').slideUp();
                $('#for-update').slideDown();

                let oldsize = $(`#${thekey} > .size`).text(),
                    oldcapacitance = $(`#${thekey} > .capacitance`).text(),
                        oldvoltage = $(`#${thekey} > .voltage`).text(),
                          oldprice = $(`#${thekey} > .price`).text();
        
                $('[name=newsize]').val(oldsize);
                $('[name=newcapacitance]').val(oldcapacitance);
                $('[name=newvoltage]').val(oldvoltage);
                $('[name=newprice]').val(oldprice);
                $('[name=id]').val(thekey);

                $('[name=update]').click(function(e){
                    e.preventDefault();
                    let newsize = $('[name=newsize]').val(),
                      newcapacitance = $('[name=newcapacitance]').val(),
                          newvoltage = $('[name=newvoltage]').val(),
                            newprice = $('[name=newprice]').val(),
                           newsizeNumber = newsize.replace(/[^0-9]/g, '');
                    newcapacitanceNumber = newcapacitance.replace(/[^0-9]/g, '');
                        newvoltageNumber = newvoltage.replace(/[^0-9]/g, '');
                          newpriceNumber = newprice.replace(/[^0-9]/g, '');
                    
                    selection.child(thekey).update({
                             size : newsizeNumber,
                      capacitance : newcapacitanceNumber,
                          voltage : newvoltageNumber,
                            price : newpriceNumber,
                        
                        },function(error){
                            if(!error){
                                Notification('update');           
                                $('#for-update').slideUp();
                                $('#header').slideDown();
                        }
                    })
                });           
            });
        } else {
            console.log('No data found')
        }
   });
});