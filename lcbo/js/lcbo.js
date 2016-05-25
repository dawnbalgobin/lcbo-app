// console.log('hello world');
// made an empty variable as an object, everything below will run inside this
var lcbo = {};

// initialize application 
    lcbo.init = function() {
    		// calling the function below so the data from the api is being got
    		// lcbo.getData();
    	//Code to listen for form submit and getting values when user choice is made
    	 $('form').on('submit', function(e) {
    			e.preventDefault();
    			var originChoice = $('input[name=origin]:checked').val();
  				// console.log(originChoice); 
  				var styleChoice = $('input[name=flavour]:checked').val();
  				var priceChoice = $('input[name=amount]:checked').val();  

				lcbo.getData(originChoice, styleChoice, priceChoice);
				
    			});	
    		
    };

    // get data, filtered down to just 60 whiskies
    lcbo.getData = function(country, taste, money) {
        $.ajax({
              url: 'https://lcboapi.com/products',
              headers: { 'Authorization': ' Token MDpjMmY5MWM5ZS1hYTQ3LTExZTUtYTBlMS00Mzc3MzZiNTUyMGY6ZnR5YzJrVDRQMkFMZmdoVU84aUFEQXdaOEtyd1Vkd1hsSml4' },
              data: {
              	q: 'whiskey', 
              	per_page: 100,
              	origin: country,
              	style: taste,
              	price_in_cents: money
              }
        }).then(function(data) {
          // console.log(data.result);
          lcbo.sortData(data.result, country, taste, money);
        });
    }
// on click of origin button selection have whiskies filtered by origin
    lcbo.sortData = function(whiskeyData, country, taste, money){
      console.log(whiskeyData);
      whiskeyData = whiskeyData.filter(function(whiskey){
        // console.log(country);
        // console.log(whiskey.origin);
        var reg = new RegExp(country,'i');
        return whiskey.origin.match(reg);
      });

// on click of style button selection have whiskies filtered by style

      tasteArray = whiskeyData.filter(function(whiskey){ 
        // console.log(whiskey);
        var reg = new RegExp(taste,'i');
        if(whiskey.style === null){
          return false
        }
        else {
          return whiskey.style.match(reg);
        }
        console.log(whiskey.style);
      })

// on click of price button selection have whiskies filtered by price

      finalArray = whiskeyData.filter(function(whiskey){
        if(money === '30') {
          if(whiskey.price_in_cents < 3000) {
            return true
          } 
          else {
            return false
          }
          } else if (money === "31") {
              if(whiskey.price_in_cents > 3000) {
                return true
              }
              else {
                return false
              }
          }

      
      });
      lcbo.randomWhiskey(finalArray);
    }

    lcbo.randomWhiskey = function(array){
      // console.log(array);
      Math.floor(Math.random() * array.length);
      var number = Math.floor(Math.random() * array.length);
      var finalWhiskey = array[number]
      console.log(finalWhiskey);
      lcbo.displayResult(finalWhiskey);
    }

// dynamically include result
// inject api data into html



    lcbo.displayResult = function(randomWhiskey){
      var yourPhoto = $('<img>').attr('src', randomWhiskey.image_url);
      var yourResult = $('<h2>').text(randomWhiskey.name);
      var yourOrigin = $('<h2>').text(randomWhiskey.origin);
      var yourPrice = $('<h2>').text(randomWhiskey.price_in_cents.toFixed(2));


    $('.whiskey_result').empty();
    $('.whiskey_result').append(yourPhoto, yourResult, yourOrigin, yourPrice);

    // $('.whiskey_result').append(yourResult);

    console.log(randomWhiskey);
}

// users selections will be added together
// submit button click will return a whiskey based on users selections 
// answer will display name, origin and image result pulled from lcbo

      // console.log(whiskeyData);
      // console.log(tasteArray);
      // console.log(money);





// random button can display different options


// document ready
    $(document).ready(function(){
           lcbo.init();
     });


