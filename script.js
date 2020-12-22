var t 
            function allowDrop(ev) {
              ev.preventDefault();
            }
            
            function drag(ev) {
              ev.dataTransfer.setData("text", ev.target.id);
            }

            function getData(table){
                var data = JSON.parse(sessionStorage.getItem(table));
                return data;
            }
            
            function drop(ev, target) {
                ev.preventDefault();
                var table = target.id;
                var id = ev.dataTransfer.getData("text");
                var name = document.querySelector("#" + id + " #menu-title").textContent;
                var price = parseFloat(document.querySelector("#" + id + " #menu-content").textContent);
                var total = parseFloat(document.querySelector("#" + target.id + " #price").textContent);
                var item = parseInt(document.querySelector("#" + target.id + " #total").textContent);
                // var quantity = 
                var grandTotal = price+total;
                document.querySelector("#" + target.id + " #price").innerHTML=parseFloat(grandTotal);
                document.querySelector("#" + target.id + " #total").innerHTML=parseInt(item+1);

                var data = getData(table);
                console.log(data);
                if(data == null){
                    sessionStorage.setItem(table, JSON.stringify([]));
                    data = getData(table);
                }
                else{
                    console.log(isExists(data, name));
                    var index = isExists(data, name);
                    if(index>=0){
                        var quantity = data[index].quantity+1;
                        price = data[index].price+price;
                        // data[index].quantity +=1;
                        // data[index].price += price;
                        console.log(quantity, price);
                        const upd = data.map(item => {
                            if(item.name === name){
                                return{
                                    name, price, quantity
                                }
                            }
                            else{
                                return item;
                            }
                        })
                        console.log(upd);
                        sessionStorage.setItem(table, JSON.stringify(upd));
                        data = getData(table);

                    }else{
                        var quantity = 1;
                        console.log("else");
                        data.push({name, price, quantity});
                        sessionStorage.setItem(table, JSON.stringify(data));
                    }
                }
                console.log(data);
            }

            function isExists(data, name){
                for(var i=0;i<data.length;i++){
                    var item = data[i];
                    console.log(item.name, name);
                    if(item.name === name){
                        console.log("yess");
                        return i;
                    }
                }
                return -1;
            }

            function openModel(target){
                
                document.getElementById("myModal").style.display = "block";
                console.log(getData(target.id));
                var data = getData(target.id);
                var total = 0;
                document.querySelector("#myModal .modal-content .modal-header").innerHTML = "<h2>"+target.id+"</h2>";
                var d = '<tr>\
                            <th>S.No</th>\
                            <th>Item</th>\
                            <th>Price</th>\
                            <th></th>\
                            <th></th>\
                        </tr>';

                for(i=0;i<data.length;i++){
                    total += data[i].price;
                    var c = i + 1;
                    d += '<tr class="row'+c+'">\
                            <td>'+c+'</td>\
                            <td>'+data[i].name+'</td>\
                            <td><span id="price'+c+'">'+data[i].price+'</span></td>\
                            <td><input class="'+ data[i].quantity+'" id="'+c+'" type="number" min="1" name="'+((data[i].price)/data[i].quantity)+'" value="'+data[i].quantity+'" onkeyup="quantity(this.id, value, name)"</td>\
                            <td><i class="fa fa-trash" aria-hidden="true" onclick="remove(event, this)"></i></td>\
                        </tr>';
                }
                document.getElementById("grand_total").innerHTML = total;
                document.getElementById("billing").innerHTML = d;

                t=total;

                // document.querySelector("#myModal .modal-content .modal-body").innerHTML = "<h3>"+target.id+" body</h3>";
            }
            function up(e){
                console.log(e);
                console.log(e.target.value)
            }

            function onLoad(){
                var table1Data = getData("table-1");
                var table2Data = getData("table-2");
                var table3Data = getData("table-3");
                var total = parseFloat("0");
                var i;
                var qun = 0;
                if(table1Data==null){
                    sessionStorage.setItem("table-1", JSON.stringify([]));
                    table1Data = getData("table-1");
                }else{
                    
                    for(i=0;i<table1Data.length;i++){
                        var p = table1Data[i].price;
                        total += p;
                        qun += parseInt(table1Data[i].quantity);
                    }
                    document.querySelector("#" + "table-1" + " #price").innerHTML=parseFloat(total);
                    document.querySelector("#" + "table-1" + " #total").innerHTML=parseInt(qun);
                }
                console.log(table1Data);
                if(table2Data==null){
                    sessionStorage.setItem("table-2", JSON.stringify([]));
                    table2Data = getData("table-2");
                }else{
                    total = 0;
                    var j;
                    qun = 0;
                    for(j=0;j<table2Data.length;j++){
                        var p = table2Data[j].price;
                        total += p;
                        qun += parseInt(table2Data[j].quantity);
                    }
                    document.querySelector("#" + "table-2" + " #price").innerHTML=parseFloat(total);
                    document.querySelector("#" + "table-2" + " #total").innerHTML=parseInt(qun);
                }
                
                if(table3Data==null){
                    sessionStorage.setItem("table-3", JSON.stringify([]));
                    table3Data = getData("table-3");
                }
                else{
                    total = 0;
                    qun = 0;
                    for(j=0;j<table3Data.length;j++){
                        var p = table3Data[j].price;
                        total += p;
                        qun += parseInt(table3Data[j].quantity);
                    }
                    document.querySelector("#" + "table-3" + " #price").innerHTML=parseFloat(total);
                    document.querySelector("#" + "table-3" + " #total").innerHTML=parseInt(qun);
                }
                console.log(table2Data);
                console.log(table3Data);


                //default search
            }

            function remove(e, f){
                var table = document.getElementById("billing");
                var tbody = table.getElementsByTagName('tbody')[0]
                var rows = tbody.getElementsByTagName('tr');
                for (i = 0; i < rows.length; i++) {
                    
                    rows[i].onclick = function() {
                        var name = rows[this.rowIndex].getElementsByTagName('td')[1].textContent;
                        var price = rows[this.rowIndex].getElementsByTagName('td')[2].textContent;
                        var total = document.getElementById("grand_total").textContent;
                        console.log(total);
                        var grandtotal = parseFloat(total) - parseFloat(price);
                        document.getElementById("grand_total").innerHTML = grandtotal;

                        const title = document.querySelector(".modal-header").textContent;
                        var data = getData(title);
                        const prod = data.filter(item => item.name !==name);

                        sessionStorage.setItem(title, JSON.stringify(prod));
                        table.deleteRow(this.rowIndex );
                    }
                }
                
            }

            function quantity(id, val, g){
                var x = document.getElementById(id);
                var c = x.className;
                var price = g*val;
                var quantity = val
                document.getElementById("price"+id).innerHTML = g*val;
                const title = document.querySelector(".modal-header").textContent;
                var data = getData(title);
                var name = document.querySelector(".row"+id).getElementsByTagName('td')[1].textContent;

                const upd = data.map(item => {
                    if(item.name === name){
                        return{
                            name, price, quantity
                        }
                    }
                    else{
                        return item;
                    }
                })
                sessionStorage.setItem(title, JSON.stringify(upd));
                checkout();
            }

            function checkout(){
                // document.querySelector(".grand-total").style.display = "block";
                console.log(document.querySelector(".modal-header").textContent);
            
                var tabledata = getData(document.querySelector(".modal-header").textContent);
                var total = 0;
                for(j=0;j<tabledata.length;j++){
                        var p = tabledata[j].price;
                        total += p;
                    }
                    document.querySelector("#grand_total").innerHTML = total;
            }

            function searchTable(e){
                const text = e.target.value.toLowerCase();
                console.log(text);
                document.querySelectorAll("#box .table").forEach(function(task){
                    
                    var val = task.firstElementChild.textContent;
                    if(val.toLowerCase().indexOf(text) != -1){
                        task.style.display = "block";
                    }else{
                        task.style.display = "none";
                    }
                });

                // var readOnly = document.querySelector("#tableSearch").value.length;
                // $("#tableSearch").on('keypress, keydown', function(event){
                //     console.log(e.which);
                //     if((e.which != 37 && (e.which !=39 ))
                //         && ((this.selectionStart < readOnly)
                //         || ((this.selectionStart == readOnly)
                //         && (e.which == 8)))){
                //             return false;
                //         }
                // });
                    
            }

            function searchItem(e){
                const text = e.target.value.toLowerCase();
                console.log(text);
                document.querySelectorAll("#menu-list .menu").forEach(function(task){
                    
                    var val = task.firstElementChild.textContent;
                    if(val.toLowerCase().indexOf(text) != -1){
                        task.style.display = "block";
                    }else{
                        task.style.display = "none";
                    }
                });
            }

            window.onclick = function(event) {
                var modal = document.getElementById("myModal");
                if (event.target == modal) {
                    document.getElementById("myModal").style.display = "none";
                    location.reload();
                }
            }