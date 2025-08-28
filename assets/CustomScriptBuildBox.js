$(document).ready(function(){
  $(".sub-items ul li").click(function(){
    $(".sub-items ul li").each(function(){
      $(this).removeClass("build_box_selected");
    })
    $(this).addClass("build_box_selected");
    $(".step-trigger .step-li-1").removeClass("isActive");
    $(".step-trigger .step-li-1 a").removeClass("isActive");
    $(".step-trigger .step-li-2").addClass("isActive");
    $(".step-trigger .step-li-2 a").addClass("isActive");
    $(".section-step-1").hide();
    $(".section-step-2").show();
    var getPackagesrc = $(".build_box_selected figure img").attr("src");
    $(".prod_list.add_costom-cart>li a img").attr("src",getPackagesrc);
    var PackProductName = $(this).data("product-name");
    var PackProductActualPrice = $(this).data("price");
    var PackProductCalcPrice = $(this).data("pureprice");
    $(".list-items").append('<li class="pacage-list"><div class="quantity">1</div><div class="name">'+PackProductName+'</div><div class="price"><span class="base-price">'+PackProductActualPrice+'</span></div><div class="empty-area" data-id="2134282141750-20526714617910"></div></li>');
  })

  /*****************2nd STEP *****************/
  $(".buy-button.single span").click(function(){
    var imagepath =$(this).data("product-img");
    var ProductId =$(this).data("id");
    var ProductName = $(this).data("product-name");
    var ProductActualPrice =$(this).data("price");
     var Actualprice =$(this).data("pureprice");
    if($(this).hasClass("wecanhideitnow")){
      alert("firsttime");
     }
    else
    {
  $(".prod_list.add_costom-cart").append('<li class="products_in_box type__products"><a data-id="'+ProductId+'" href="javascript:void(0)"  data-pureprice="4000"><img src="'+imagepath+'" title="Simple Swaps Plant-Based Cookbook"><div class="quantity-badge"><span></span><span></span></div><div class="curadded">1</div></a></li>');
$(this).addClass("wecanhideitnow");
$(this).parents(".buy-button.single").append('<span class="addedinthebox"><p class="addedintheboxminus" id="addedintheboxminus">-</p><span><span class="addednumber" id="addednumber">1</span> in a box</span><p class="addedintheboxplus">+</p></span>');
$(".list-items").append('<li class="type__productPrice"><div class="quantity">1</div><div class="name">'+ProductName+'</div><div class="price"><span class="base-price">'+ProductActualPrice+'</span></div><div class="remove-product" data-id="'+ProductId+'"><span class="remove"><span></span><span></span></span></div></li>');
}
var getPrice = 0;
$(".type__productPrice").each(function(){
 var getcurrencyPrice = $(this).find(".base-price").html();
    getcurrencyPrice = getcurrencyPrice.replace("Rs. ","");
    getcurrencyPrice = (parseFloat(getcurrencyPrice));
     getPrice = (getcurrencyPrice+getPrice);
})
var packageprice = $(".pacage-list").find(".base-price").html();
packageprice = packageprice.toString().replace("Rs.", "").trim();
packageprice = parseFloat(packageprice);
console.log(packageprice);
getPrice = (packageprice+getPrice);
$(".subtotal").html("Rs. "+getPrice);
})

if (typeof Shopify.money_format === "undefined") {
  Shopify.money_format = "Rs. {{amount}}"; 
}
if (typeof Shopify.money_with_currency_format === "undefined") {
  Shopify.money_with_currency_format = "Rs. {{amount}} INR"; 
}

$('body').on('click', '.addedintheboxplus', function() {
 var getNUmber =  $(this).prev("span").children(".addednumber").html();
 getNUmber= parseInt(getNUmber);
 if(getNUmber>=1)
 {
  getNUmber = (getNUmber+1);
$(this).prev("span").children(".addednumber").html(getNUmber);
}

var ProductId = $(this).parent(".addedinthebox").prev("span").data("id");
      $(".products_in_box").each(function(){
        var existId = $(this).children("a").data("id");
        if(existId==ProductId)
        {
          $(this).children("a").children(".curadded").html(getNUmber);
        }
      })
       var getNUmbernew = parseInt($(this).prev("span").children(".addednumber").html()) || 0;
       var Actualprice = parseFloat(
  $(this).closest(".addedinthebox").siblings(".wecanhideitnow").data("pureprice")
) || 0;

Actualprice = (Actualprice / 100);
var getPrice = 0;
$(".type__productPrice").each(function(){
  var PRoductIdget = $(this).find(".remove-product").data("id");
  PRoductIdget = parseInt(PRoductIdget);
var totalsum = Actualprice * getNUmbernew; // e.g. 500
// Shopify expects cents → multiply by 100
//var formattedTotal = Shopify.formatMoney(totalsum * 100, "{{amount}}");
var formattedTotal = Shopify.formatMoney(totalsum * 100, Shopify.money_format);

  if(PRoductIdget==ProductId){
    $(this).find(".quantity").html(getNUmber);
    $(this).find(".base-price").html(formattedTotal);
  }
    var getcurrencyPrice = $(this).find(".base-price").html();
    getcurrencyPrice = getcurrencyPrice.replace("Rs. ","");
    getcurrencyPrice = (parseFloat(getcurrencyPrice));
     getPrice = (getcurrencyPrice+getPrice);
})
var packageprice = $(".pacage-list").find(".base-price").html();
packageprice = packageprice.toString().replace("Rs.", "").trim();
console.log(packageprice);
packageprice = parseFloat(packageprice);
console.log(packageprice);
getPrice = (packageprice+getPrice);
$(".subtotal").html("Rs. "+getPrice);
})

  $('body').on('click', '.addedintheboxminus', function() {
 var getNUmber =  $(this).next("span").children(".addednumber").html();
 getNUmber= parseInt(getNUmber);
 
 if(getNUmber>1)
 {
  getNUmber = (getNUmber-1);
$(this).next("span").children(".addednumber").html(getNUmber);
}

var ProductId = $(this).parent(".addedinthebox").prev("span").data("id");
$(".products_in_box").each(function(){
        var existId = $(this).children("a").data("id");
        if(existId==ProductId)
        {
          $(this).children("a").children(".curadded").html(getNUmber);
        }
      })
      var getNUmbernew = parseInt($(this).next("span").children(".addednumber").html()) || 0;
       var Actualprice = parseFloat(
  $(this).closest(".addedinthebox").siblings(".wecanhideitnow").data("pureprice")
) || 0;
   Actualprice = (Actualprice / 100); 
   var getPrice = 0;
      $(".type__productPrice").each(function(){
  var PRoductIdget = $(this).find(".remove-product").data("id");
  var totalsum = Actualprice * getNUmbernew; // e.g. 500
// Shopify expects cents → multiply by 100
//var formattedTotal = Shopify.formatMoney(totalsum * 100, "{{amount}}");
var formattedTotal = Shopify.formatMoney(totalsum * 100, Shopify.money_format);
  if(PRoductIdget==ProductId){
    $(this).find(".base-price").html(formattedTotal);
    $(this).find(".quantity").html(getNUmber);
  }
      var getcurrencyPrice = $(this).find(".base-price").html();
    getcurrencyPrice = getcurrencyPrice.replace("Rs. ","");
    getcurrencyPrice = (parseFloat(getcurrencyPrice));
     getPrice = (getcurrencyPrice+getPrice);
})
var packageprice = $(".pacage-list").find(".base-price").html();
packageprice = packageprice.toString().replace("Rs.", "").trim();
console.log(packageprice);
packageprice = parseFloat(packageprice);
console.log(packageprice);
getPrice = (packageprice+getPrice);
$(".subtotal").html("Rs. "+getPrice);
})

  $('body').on('click', '.quantity-badge', function() {
  var RemoveId =$(this).parent("a").data("id");
  $(this).parent("a").parent("li").remove();
  $(".create-box.custom_flex-prbox.js-product_list li").each(function(){
    var allId = $(this).data("id");
    console.log(allId)
    if(allId==RemoveId){ 
      $(this).find('.addedinthebox').remove();
      $(this).find(".wecanhideitnow").removeClass("wecanhideitnow");
    }
  })
})

/***************Product ADD **************/
$("#complete-box").click(function(){
  var packageprice = $(".subtotal").html();
  
   packageprice = packageprice.toString().replace("Rs.", "").trim();
   packageprice = parseFloat(packageprice);
   console.log(packageprice);
  const data = {
        title: "Build your Own Box",
        price: packageprice,
        image: "https://all-testing.myshopify.com/cdn/shop/files/cb66bd537c381c1786d193adbf71d234.jpg?v=1755853252"
      };

      $.ajax({
        url: 'https://usplapps.com/shopify_app/built-box/create-product.php',
        type: 'POST',
        data: data,
        success: function(response) {
          $('#response').html('<pre>' + response + '</pre>');
        },
        error: function(xhr) {
          $('#response').html('Error: ' + xhr.responseText);
        }
      });
})


})
// document.querySelectorAll('.sub-items ul li').forEach(function(item) {
//      item.addEventListener('click', function() {
//     document.querySelectorAll(".sub-items ul li").forEach(function(li){
// li.classList.remove('build_box_selected');
//     })
//     alert("click");
//     this.classList.add('build_box_selected');
//     let activeLi = document.querySelector('.step-trigger li.isActive');

// if (activeLi && activeLi.nextElementSibling) {
//   // remove from current li
//   activeLi.classList.remove('isActive');
//   // remove from its child <a>
//   let activeLink = activeLi.querySelector('a');
//   if (activeLink) activeLink.classList.remove('isActive');

//   // add to next li
//   let nextLi = activeLi.nextElementSibling;
//   nextLi.classList.add('isActive');

//   // add to its child <a>
//   let nextLink = nextLi.querySelector('a');
//   if (nextLink) nextLink.classList.add('isActive');
// }
// const toHide = document.querySelector('#shopify-section-template--25352370618677__packaging');
//   const toShow = document.querySelector('#shopify-section-template--25352370618677__Items'); // <-- change this

//   if (toHide) toHide.style.display = 'none';
//   if (toShow) {
//     toShow.style.removeProperty('display'); // clears any inline display:none
//     toShow.style.display = 'block';
//   }
//   });
// });