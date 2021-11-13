// **********add product with price************


// First tr
var products = [

    {id : 1, name:'Laptop',price:50000},
    {id : 2, name:'Keyboard' , price:500 },
    {id : 3, name:'Mouse', price:300 },
    {id : 4, name:'Pendrive' , price:450 },
];
var select ='';

select += '<select bitm="1" onchange="setProductPriceAndQuantity(this.value, this)">';
select+= '<option disable selected> Select Product </option>';
$.each(products,function(key,value){

    select += '<option value="'+value.id+'">'+value.name +'</option>';
})
select += '</select>';
$('#td1').append(select);

var customIndex=2;
$('#addBtn').click(function(){
    var tr ='';
    tr+='<tr>';
    tr+='<td>';
    tr += '<select bitm="'+customIndex+'" onchange="setProductPriceAndQuantity(this.value,this)">';
    tr+= '<option disable selected> Select Product </option>';
     $.each(products,function(key,value){

        tr += '<option value="'+value.id+'">'+value.name +'</option>';
    })
     tr+='</select>';
    tr+='</td>';
   
    tr+='<td><input type="number" bitm="'+customIndex+'" onkeyup="adjustTotalPrice(this)" id ="price'+customIndex+'"></td>';
    tr+='<td><input type="number" bitm="'+customIndex+'" onkeyup="setTotalPrice(this)" id ="qty'+customIndex+'"/></td>';
    tr+='<td><input type="text" readonly class="item-total-price" id="total'+customIndex+'"/></td>';
    tr+='<td><button type="button" class="remove-btn"> - </button></td>';
    tr+='</tr>';

    $('#res').append(tr);
    customIndex++;
});


$(document).on('click', '.remove-btn',function(){
    $(this).closest('tr').remove();
    setGrandTotalPrice()
});


function setProductPriceAndQuantity(id, select)
{
   var product=products.find(product => {return product.id == id});
   var index = $(select).attr('bitm');
   console.log (index);
   $('#price'+index).val(product.price);
   $('#qty'+index).val(1);
   $('#total'+index).val(product.price*1);
   setGrandTotalPrice()

}

function setTotalPrice(input)
{
   var index= $(input).attr('bitm');
   var qty = $(input).val();
   var  price =$('#price'+index).val();
   var total = price * qty;
   $('#total'+index).val(total);
   setGrandTotalPrice()
}

function adjustTotalPrice(input)
{
    var index= $(input).attr('bitm');
   var price = $(input).val();
   var  qty =$('#qty'+index).val();
   var total = price * qty;
   $('#total'+index).val(total);
   setGrandTotalPrice()
}


function setGrandTotalPrice()
{
var sum =0;

    $('.item-total-price').each(function(index){
        sum = sum + Number($(this).val());
    });
    $('#grandTotal').text(sum);
}