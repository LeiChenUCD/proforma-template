function get_added_key_list(num, end) {
    var ret = []
    for (var i = end - num + 1; i <= end; i++) {
        ret.push(get_key_from_row(i))
    }
    return ret
}

function get_added_val_list(num, end) {
    var ret = []
    for (var i = end - num + 1; i <= end; i++) {
        ret.push(get_val_from_row(i))
    }
    return ret
}

document.getElementById("copy_link").onclick = async() => {

    // const res = await fetch("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal?app_id=cli_a5608c29ba78500a&app_secret=s1ILLU7vQ3mo45f93PQgoTO5NaofZVc3", {
    //     method: "POST",
    //     headers: {
    //         "User-Agent": "PostmanRuntime/7.36.3",
    //         "Content-Type": "application/json"
    //     }
    // })
    // const data = await res.json()
    // console.log(data)
    

    var table = document.querySelector("table")
    // get number of added entries
    var ac_num = ac_row - 24
    var hch_num = hch_row - ac_row - 20
    var hcv_num = hcv_row - hch_row - 27
    var sc_num = sc_row - hcv_row - 11
    var hc_num = hc_row - sc_row - 11
    var fc_num = fc_row - hc_row - 10
    var ac_key_list = get_added_key_list(ac_num, ac_row)
    var ac_val_list = get_added_val_list(ac_num, ac_row)
    var hch_key_list = get_added_key_list(hch_num, hch_row)
    var hch_val_list = get_added_val_list(hch_num, hch_row)
    var hcv_key_list = get_added_key_list(hcv_num, hcv_row)
    var hcv_val_list = get_added_val_list(hcv_num, hcv_row)
    var sc_key_list = get_added_key_list(sc_num, sc_row)
    var sc_val_list = get_added_val_list(sc_num, sc_row)
    var hc_key_list = get_added_key_list(hc_num, hc_row)
    var hc_val_list = get_added_val_list(hc_num, hc_row)
    var fc_key_list = get_added_key_list(fc_num, fc_row)
    var fc_val_list = get_added_val_list(fc_num, fc_row)

    console.log(fc_key_list)
    console.log(fc_val_list)
}

// console.log("10.12,11,12".split(",").map(Number))
var ac_row = 24
var hch_row = 44
var hcv_row = 71
var sc_row = 82
var hc_row = 93
var fc_row = 103

function addRow(curRow) {
    var table = document.querySelector("table")
    var row = table.insertRow(curRow);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell1.innerHTML = "<input>"
    cell1.lastElementChild.style.textAlign = "left"
    cell2.innerHTML = "$<input placeholder='0'>"
    cell2.classList.add("alignRight")
    cell3.style.borderRight = "1px black solid"
    cell4.classList.add("grayEntry")
    cell5.classList.add("grayEntry")
    cell6.classList.add("grayEntry")
    cell7.classList.add("grayEntry")
    return cell2
}

function style_input(val, element) {
    dot = val.indexOf(".") + 1 == val.length && val.indexOf(".") != -1 ? '.' : ''
    newVal = parseFloat(val.replace(/,/g, ""))
    if (newVal !== newVal) newVal = 0
    element.value = newVal.toLocaleString(undefined, {maximumFractionDigits: 2}) + dot
    return newVal
}

function get_key_from_row(row) {
    var table = document.querySelector("table")
    var row = table.getElementsByTagName("tr")[row - 1]
    newVal = row.getElementsByTagName("td")[0].lastElementChild.value
    if (newVal !== newVal) newVal = 0
    return newVal
}

function get_val_from_row(row) {
    var table = document.querySelector("table")
    var row = table.getElementsByTagName("tr")[row - 1]
    newVal = parseFloat(row.getElementsByTagName("td")[1].lastElementChild.value.replace(/,/g, ""))
    if (newVal !== newVal) newVal = 0
    return newVal
}

// --------------Acquisition Costs--------------------------------------

document.getElementById("ac_add").onclick = function() {
    var cell2 = addRow(ac_row)
    ac_row++;
    hch_row++;
    hcv_row++
    sc_row++
    hc_row++
    fc_row++
    var old_val = 0
    cell2.lastElementChild.oninput = function() {
        var val = style_input(cell2.lastElementChild.value, cell2.lastElementChild)
        ac -= old_val
        ac += val
        old_val = val
        setb26()
    }
}

document.getElementById("ac_delete").onclick = function() {
    if (ac_row == 24) return

    var val = get_val_from_row(ac_row)
    ac -= val
    setb26()

    var table = document.querySelector("table")
    table.deleteRow(ac_row-- - 1)
    hch_row--
    hcv_row--
    sc_row--
    hc_row--
    fc_row--

}

// --------------Hard Costs-Horizontal--------------------------------------

document.getElementById("hch_add").onclick = function() {
    var cell2 = addRow(hch_row)
    hch_row++
    hcv_row++
    sc_row++
    hc_row++
    fc_row++

    var old_val = 0
    cell2.lastElementChild.oninput = function() {
        var val = style_input(cell2.lastElementChild.value, cell2.lastElementChild)
        hch -= old_val
        hch += val
        old_val = val
        setb43()
    }
}

document.getElementById("hch_delete").onclick = function() {
    if (hch_row - ac_row == 20) return

    var val = get_val_from_row(hch_row)
    hch -= val
    setb43()

    var table = document.querySelector("table")
    table.deleteRow(hch_row-- - 1)
    hcv_row--
    sc_row--
    hc_row--
    fc_row--
}

// --------------Hard Costs-Vertical--------------------------------------

document.getElementById("hcv_add").onclick = function() {
    var cell2 = addRow(hcv_row)
    hcv_row++
    sc_row++
    hc_row++
    fc_row++

    var old_val = 0
    cell2.lastElementChild.oninput = function() {
        var val = style_input(cell2.lastElementChild.value, cell2.lastElementChild)
        hcv -= old_val
        hcv += val
        old_val = val
        setb69()
    }
}

document.getElementById("hcv_delete").onclick = function() {
    if (hcv_row - hch_row == 27) return

    var val = get_val_from_row(hcv_row)
    hcv -= val
    setb69()

    var table = document.querySelector("table")
    table.deleteRow(hcv_row-- - 1)
    sc_row--
    hc_row--
    fc_row--
}

// --------------Soft Costs--------------------------------------

document.getElementById("sc_add").onclick = function() {
    var cell2 = addRow(sc_row)
    sc_row++
    hc_row++
    fc_row++

    var old_val = 0
    cell2.lastElementChild.oninput = function() {
        var val = style_input(cell2.lastElementChild.value, cell2.lastElementChild)
        sc -= old_val
        sc += val
        old_val = val
        setb79()
    }
}

document.getElementById("sc_delete").onclick = function() {
    if (sc_row - hcv_row == 11) return

    var val = get_val_from_row(sc_row)
    sc -= val
    setb79()

    var table = document.querySelector("table")
    table.deleteRow(sc_row-- - 1)
    hc_row--
    fc_row--
}

// --------------Holding Costs--------------------------------------

document.getElementById("hc_add").onclick = function() {
    var cell2 = addRow(hc_row)
    hc_row++
    fc_row++
    
    var old_val = 0
    cell2.lastElementChild.oninput = function() {
        var val = style_input(cell2.lastElementChild.value, cell2.lastElementChild)
        hc -= old_val
        hc += val
        old_val = val
        setb88()
    }
}

document.getElementById("hc_delete").onclick = function() {
    if (hc_row - sc_row == 11) return

    var val = get_val_from_row(hc_row)
    hc -= val
    setb88()

    var table = document.querySelector("table")
    table.deleteRow(hc_row-- - 1)
    fc_row--
}

// --------------Financing Costs--------------------------------------

document.getElementById("fc_add").onclick = function() {
    var table = document.querySelector("table")
    var row = table.insertRow(fc_row);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell1.innerHTML = "<input>"
    cell1.lastElementChild.style.textAlign = "left"
    cell2.innerHTML = "$<input>"
    cell2.classList.add("alignRight")
    cell7.style.borderRight = "1px black solid"

    fc_row++
    
    var old_val = 0
    cell2.lastElementChild.oninput = function() {
        var val = style_input(cell2.lastElementChild.value, cell2.lastElementChild)
        fc -= old_val
        fc += val
        old_val = val
        setb105()
    }
}

document.getElementById("fc_delete").onclick = function() {
    if (fc_row - hc_row == 10) return

    var val = get_val_from_row(fc_row)
    fc -= val
    setb105()

    var table = document.querySelector("table")
    table.deleteRow(fc_row-- - 1)
}



// intermediate
var ac = 0
var hch = 0
var hcv = 0
var sc = 0
var hc = 0
var fc = 0
// strings
var b2 = ""
var b3 = ""
var b4 = ""
var b5 = ""
// numbers
var b6 = 0
var b8 = 1
var b9 = 0
var b10 = 0
var b11 = 0
var b15 = 0
var f15 = 0
var b16 = 0
var f16 = 0
var b17 = 0
var f17 = 0
var b24 = 0
var b31 = 0
var b32 = 0
var b33 = 0
var b34 = 0
var b35 = 0
var b36 = 0
var b37 = 0
var b38 = 0
var b39 = 0
var b40 = 0
var b41 = 0
var b42 = 0
var b46 = 0
var b47 = 0
var b48 = 0
var b49 = 0
var b50 = 0
var b51 = 0
var b52 = 0
var b53 = 0
var b54 = 0
var b55 = 0
var b56 = 0
var b57 = 0
var b58 = 0
var b59 = 0
var b60 = 0
var b61 = 0
var b62 = 0
var b63 = 0
var b64 = 0
var b65 = 0
var b66 = 0
var b67 = 0
var b68 = 0
var b74 = 0
var b75 = 0
var b76 = 0
var b77 = 0
var b78 = 0
var b85 = 0
var b86 = 0
var b87 = 0
var b94 = 0
var b100 = 0
var f95 = 0
var f102 = 0
var b112 = 0
var b113 = 0
var b114 = 0
var e119 = 0
var d127 = 0
var b148 = 0
var b155 = 0
// percentages
var c22 = 0
var c23 = 0
var c83 = 0
var c84 = 0
var c98 = 0
var g94 = 0
var g96 = 0
var g100 = 0
var g101 = 0
var g105 = 0
var e103 = 0
var e104 = 0
var c109 = 0
var c110 = 0
var c111 = 0
var c128 = 0
var c129 = 0


function init() {
    document.getElementById("b2").innerHTML = b2
    document.getElementById("b3").innerHTML = b3
    document.getElementById("b4").innerHTML = b4
    document.getElementById("b5").innerHTML = b5

    document.getElementById("b6").value = b6.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb6()
    document.getElementById("b8").value = b8.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb8()
    document.getElementById("b9").value = b9.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb9()
    document.getElementById("b10").value = b10.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb10()
    document.getElementById("b11").value = b11.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb11()
    document.getElementById("b15").value = b15.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb15()
    document.getElementById("f15").value = f15.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf15()
    document.getElementById("b16").value = b16.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb16()
    document.getElementById("f16").value = f16.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf16()
    document.getElementById("b17").value = b17.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb17()
    document.getElementById("f17").value = f17.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf17()
    document.getElementById("b24").value = b24.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb24()
    document.getElementById("b31").value = b31.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb31()
    document.getElementById("b32").value = b32.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb32()
    document.getElementById("b33").value = b33.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb33()
    document.getElementById("b34").value = b34.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb34()
    document.getElementById("b35").value = b35.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb35()
    document.getElementById("b36").value = b36.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb36()
    document.getElementById("b37").value = b37.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb37()
    document.getElementById("b38").value = b38.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb38()
    document.getElementById("b39").value = b39.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb39()
    document.getElementById("b40").value = b40.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb40()
    document.getElementById("b41").value = b41.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb41()
    document.getElementById("b42").value = b42.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb42()
    document.getElementById("b46").value = b46.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb46()
    document.getElementById("b47").value = b47.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb47()
    document.getElementById("b48").value = b48.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb48()
    document.getElementById("b49").value = b49.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb49()
    document.getElementById("b50").value = b50.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb50()
    document.getElementById("b51").value = b51.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb51()
    document.getElementById("b52").value = b52.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb52()
    document.getElementById("b53").value = b53.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb53()
    document.getElementById("b54").value = b54.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb54()
    document.getElementById("b55").value = b55.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb55()
    document.getElementById("b56").value = b56.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb56()
    document.getElementById("b57").value = b57.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb57()
    document.getElementById("b58").value = b58.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb58()
    document.getElementById("b59").value = b59.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb59()
    document.getElementById("b60").value = b60.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb60()
    document.getElementById("b61").value = b61.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb61()
    document.getElementById("b62").value = b62.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb62()
    document.getElementById("b63").value = b63.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb63()
    document.getElementById("b64").value = b64.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb64()
    document.getElementById("b65").value = b65.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb65()
    document.getElementById("b66").value = b66.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb66()
    document.getElementById("b67").value = b67.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb67()
    document.getElementById("b68").value = b68.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb68()
    document.getElementById("b74").value = b74.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb74()
    document.getElementById("b75").value = b75.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb75()
    document.getElementById("b76").value = b76.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb76()
    document.getElementById("b77").value = b77.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb77()
    document.getElementById("b78").value = b78.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb78()
    document.getElementById("b85").value = b85.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb85()
    document.getElementById("b86").value = b86.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb86()
    document.getElementById("b87").value = b87.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb87()
    document.getElementById("b94").value = b94.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb94()
    document.getElementById("b100").value = b100.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb100()
    document.getElementById("f95").value = f95.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf95()
    document.getElementById("f102").value = f102.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf102()
    document.getElementById("b112").value = b112.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb112()
    document.getElementById("b113").value = b113.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb113()
    document.getElementById("b114").value = b114.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb114()
    document.getElementById("e119").value = e119.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete119()
    document.getElementById("d127").value = d127.toLocaleString(undefined, {maximumFractionDigits: 2})
    setd127()
    document.getElementById("b148").value = b148.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb148()
    document.getElementById("b155").value = b155.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb155()
    // percentages
    document.getElementById("c22").value = c22.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc22()
    document.getElementById("c23").value = c23.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc23()
    document.getElementById("c83").value = c83.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc83()
    document.getElementById("c84").value = c84.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc84()
    document.getElementById("c98").value = c98.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc98()
    document.getElementById("g94").value = g94.toLocaleString(undefined, {maximumFractionDigits: 2})
    setg94()
    document.getElementById("g96").value = g96.toLocaleString(undefined, {maximumFractionDigits: 2})
    setg96()
    document.getElementById("g100").value = g100.toLocaleString(undefined, {maximumFractionDigits: 2})
    setg100()
    document.getElementById("g101").value = g101.toLocaleString(undefined, {maximumFractionDigits: 2})
    setg101()
    document.getElementById("g105").value = g105.toLocaleString(undefined, {maximumFractionDigits: 2})
    setg105()
    document.getElementById("e103").value = e103.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete103()
    document.getElementById("e104").value = e104.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete104()
    document.getElementById("c109").value = c109.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc109()
    document.getElementById("c110").value = c110.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc110()
    document.getElementById("c111").value = c111.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc111()
    document.getElementById("c128").value = c128.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc128()
    document.getElementById("c129").value = c129.toLocaleString(undefined, {maximumFractionDigits: 2})
    setc129()
}

init()

// strings
document.getElementById("b2").oninput = function() {
    b2 = document.getElementById("b2").innerHTML
}
document.getElementById("b3").oninput = function() {
    b3 = document.getElementById("b3").innerHTML
}
document.getElementById("b4").oninput = function() {
    b4 = document.getElementById("b4").innerHTML
}
document.getElementById("b5").oninput = function() {
    b5 = document.getElementById("b5").innerHTML
}

function updateNum(id) {
    val = document.getElementById(id).value
    dot = val.indexOf(".") + 1 == val.length && val.indexOf(".") != -1 ? '.' : ''
    newVal = parseFloat(document.getElementById(id).value.replace(/,/g, ""))
    if (newVal !== newVal) newVal = 0
    document.getElementById(id).value = newVal.toLocaleString(undefined, {maximumFractionDigits: 2}) + dot;
    return newVal
}

// numbers
function setb6() {

}
document.getElementById("b6").oninput = function() {
    b6 = updateNum("b6")
    setb6()
}
function setb8() {
    setb120()
    sete134()
    sete135()
    sete136()
    sete137()
    sete138()
    sete139()
}
document.getElementById("b8").oninput = function() {
    b8 = updateNum("b8")
    setb8()
}
function setb9() {
    
}
document.getElementById("b9").oninput = function() {
    b9 = updateNum("b9")
    setb9()
}
function setb10() {
    
}
document.getElementById("b10").oninput = function() {
    b10 = updateNum("b10")
    setb10()
}
function setb11() {
    
}
document.getElementById("b11").oninput = function() {
    b11 = updateNum("b11")
    setb11()
}
function setb15() {
    setb21()
}
document.getElementById("b15").oninput = function() {
    b15 = updateNum("b15")
    setb15()
}
function setf15() {
    
}
document.getElementById("f15").oninput = function() {
    f15 = updateNum("f15")
    setf15()
}
function setb16() {
    setb21()
}
document.getElementById("b16").oninput = function() {
    b16 = updateNum("b16")
    setb16()
}
function setf16() {
    
}
document.getElementById("f16").oninput = function() {
    f16 = updateNum("f16")
    setf16()
}
function setb17() {
    
}
document.getElementById("b17").oninput = function() {
    b17 = updateNum("b17")
    setb17()
}
function setf17() {
    
}
document.getElementById("f17").oninput = function() {
    f17 = updateNum("f17")
    setf17()
}
function setb24() {
    setb151()
}
document.getElementById("b24").oninput = function() {
    b24 = updateNum("b24")
    setb26()
}
function setb31() {
    setb43()
}
document.getElementById("b31").oninput = function() {
    b31 = updateNum("b31")
    setb31()
}
function setb32() {
    setb43()
}
document.getElementById("b32").oninput = function() {
    b32 = updateNum("b32")
    setb32()
}
function setb33() {
    setb43()
}
document.getElementById("b33").oninput = function() {
    b33 = updateNum("b33")
    setb33()
}
function setb34() {
    setb43()
}
document.getElementById("b34").oninput = function() {
    b34 = updateNum("b34")
    setb34()
}
function setb35() {
    setb43()
}
document.getElementById("b35").oninput = function() {
    b35 = updateNum("b35")
    setb35()
}
function setb36() {
    setb43()
}
document.getElementById("b36").oninput = function() {
    b36 = updateNum("b36")
    setb36()
}
function setb37() {
    setb43()
}
document.getElementById("b37").oninput = function() {
    b37 = updateNum("b37")
    setb37()
}
function setb38() {
    setb43()
}
document.getElementById("b38").oninput = function() {
    b38 = updateNum("b38")
    setb38()
}
function setb39() {
    setb43()
}
document.getElementById("b39").oninput = function() {
    b39 = updateNum("b39")
    setb39()
}
function setb40() {
    setb43()
}
document.getElementById("b40").oninput = function() {
    b40 = updateNum("b40")
    setb40()
}
function setb41() {
    setb43()
}
document.getElementById("b41").oninput = function() {
    b41 = updateNum("b41")
    setb41()
}
function setb42() {
    setb43()
}
document.getElementById("b42").oninput = function() {
    b42 = updateNum("b42")
    setb42()
}
function setb46() {
    setb69()
}
document.getElementById("b46").oninput = function() {
    b46 = updateNum("b46")
    setb46()
}
function setb47() {
    setb69()
}
document.getElementById("b47").oninput = function() {
    b47 = updateNum("b47")
    setb47()
}
function setb48() {
    setb69()
}
document.getElementById("b48").oninput = function() {
    b48 = updateNum("b48")
    setb48()
}
function setb49() {
    setb69()
}
document.getElementById("b49").oninput = function() {
    b49 = updateNum("b49")
    setb49()
}
function setb50() {
    setb69()
}
document.getElementById("b50").oninput = function() {
    b50 = updateNum("b50")
    setb50()
}
function setb51() {
    setb69()
}
document.getElementById("b51").oninput = function() {
    b51 = updateNum("b51")
    setb51()
}
function setb52() {
    setb69()
}
document.getElementById("b52").oninput = function() {
    b52 = updateNum("b52")
    setb52()
}
function setb53() {
    setb69()
}
document.getElementById("b53").oninput = function() {
    b53 = updateNum("b53")
    setb53()
}
function setb54() {
    setb69()
}
document.getElementById("b54").oninput = function() {
    b54 = updateNum("b54")
    setb54()
}
function setb55() {
    setb69()
}
document.getElementById("b55").oninput = function() {
    b55 = updateNum("b55")
    setb55()
}
function setb56() {
    setb69()
}
document.getElementById("b56").oninput = function() {
    b56 = updateNum("b56")
    setb56()
}
function setb57() {
    setb69()
}
document.getElementById("b57").oninput = function() {
    b57 = updateNum("b57")
    setb57()
}
function setb58() {
    setb69()
}
document.getElementById("b58").oninput = function() {
    b58 = updateNum("b58")
    setb58()
}
function setb59() {
    setb69()
}
document.getElementById("b59").oninput = function() {
    b59 = updateNum("b59")
    setb59()
}
function setb60() {
    setb69()
}
document.getElementById("b60").oninput = function() {
    b60 = updateNum("b60")
    setb60()
}
function setb61() {
    setb69()
}
document.getElementById("b61").oninput = function() {
    b61 = updateNum("b61")
    setb61()
}
function setb62() {
    setb69()
}
document.getElementById("b62").oninput = function() {
    b62 = updateNum("b62")
    setb62()
}
function setb63() {
    setb69()
}
document.getElementById("b63").oninput = function() {
    b63 = updateNum("b63")
    setb63()
}
function setb64() {
    setb69()
}
document.getElementById("b64").oninput = function() {
    b64 = updateNum("b64")
    setb64()
}
function setb65() {
    setb69()
}
document.getElementById("b65").oninput = function() {
    b65 = updateNum("b65")
    setb65()
}
function setb66() {
    setb69()
}
document.getElementById("b66").oninput = function() {
    b66 = updateNum("b66")
    setb66()
}
function setb67() {
    setb69()
}
document.getElementById("b67").oninput = function() {
    b67 = updateNum("b67")
    setb67()
}
function setb68() {
    setb69()
}
document.getElementById("b68").oninput = function() {
    b68 = updateNum("b68")
    setb68()
}
function setb74() {
    setb79()
}
document.getElementById("b74").oninput = function() {
    b74 = updateNum("b74")
    setb74()
}
function setb75() {
    setb79()
}
document.getElementById("b75").oninput = function() {
    b75 = updateNum("b75")
    setb75()
}
function setb76() {
    setb79()
}
document.getElementById("b76").oninput = function() {
    b76 = updateNum("b76")
    setb76()
}
function setb77() {
    setb79()
}
document.getElementById("b77").oninput = function() {
    b77 = updateNum("b77")
    setb77()
}
function setb78() {
    setb79()
}
document.getElementById("b78").oninput = function() {
    b78 = updateNum("b78")
    setb78()
}
function setb85() {
    setb88()
}
document.getElementById("b85").oninput = function() {
    b85 = updateNum("b85")
    setb85()
}
function setb86() {
    setb88()
}
document.getElementById("b86").oninput = function() {
    b86 = updateNum("b86")
    setb86()
}
function setb87() {
    setb88()
    setb151()
    setb152()
}
document.getElementById("b87").oninput = function() {
    b87 = updateNum("b87")
    setb87()
}
function setb94() {
    setb105()
    setb151()
}
document.getElementById("b94").oninput = function() {
    b94 = updateNum("b94")
    setb94()
}
function setb100() {
    setb105()
    setb152()
}
document.getElementById("b100").oninput = function() {
    b100 = updateNum("b100")
    setb100()
}
function setf95() {
    setb92()
}
document.getElementById("f95").oninput = function() {
    f95 = updateNum("f95")
    setf95()
}
function setf102() {
    setb98()
}
document.getElementById("f102").oninput = function() {
    f102 = updateNum("f102")
    setf102()
}
function setb112() {
    setb115()
}
document.getElementById("b112").oninput = function() {
    b112 = updateNum("b112")
    setb112()
}
function setb113() {
    setb115()
}
document.getElementById("b113").oninput = function() {
    b113 = updateNum("b113")
    setb113()
}
function setb114() {
    setb115()
}
document.getElementById("b114").oninput = function() {
    b114 = updateNum("b114")
    setb114()
}
function sete119() {
    setb120()
}
document.getElementById("e119").oninput = function() {
    e119 = updateNum("e119")
    sete119()
}
function setd127() {
    setb127()
    setb129()
}
document.getElementById("d127").oninput = function() {
    d127 = updateNum("d127")
    setd127()
}
function setb148() {
    
}
document.getElementById("b148").oninput = function() {
    b148 = updateNum("b148")
    setb148()
}
function setb155() {
    
}
document.getElementById("b155").oninput = function() {
    b155 = updateNum("b155")
    setb155()
}

// percentages
function setc22() {
    setb22()
    setg93()
}
document.getElementById("c22").oninput = function() {
    c22 = updateNum("c22") / 100
    setc22()
}
function setc23() {
    setb23()
}
document.getElementById("c23").oninput = function() {
    c23 = updateNum("c23") / 100
    setc23()
}
function setc83() {
    setb83()
}
document.getElementById("c83").oninput = function() {
    c83 = updateNum("c83") / 100
    setc83()
}
function setc84() {
    setb84()
}
document.getElementById("c84").oninput = function() {
    c84 = updateNum("c84") / 100
    setc84()
}
function setc98() {
    setb98()
}
document.getElementById("c98").oninput = function() {
    c98 = updateNum("c98") / 100
    setc98()
}
function setg94() {
    setf94()
}
document.getElementById("g94").oninput = function() {
    g94 = updateNum("g94") / 100
    setg94()
}
function setg96() {
    setf96()
}
document.getElementById("g96").oninput = function() {
    g96 = updateNum("g96") / 100
    setg96()
}
function setg100() {
    setf100()
}
document.getElementById("g100").oninput = function() {
    g100 = updateNum("g100") / 100
    setg100()
}
function setg101() {
    setf101()
}
document.getElementById("g101").oninput = function() {
    g101 = updateNum("g101") / 100
    setg101()
}
function setg105() {
    setf105()
}
document.getElementById("g105").oninput = function() {
    g105 = updateNum("g105") / 100
    setg105()
}
function sete103() {
    setf103()
}
document.getElementById("e103").oninput = function() {
    e103 = updateNum("e103") / 100
    sete103()
}
function sete104() {
    setf104()
}
document.getElementById("e104").oninput = function() {
    e104 = updateNum("e104") / 100
    sete104()
}
function setc109() {
    setb109()
}
document.getElementById("c109").oninput = function() {
    c109 = updateNum("c109") / 100
    setc109()
}
function setc110() {
    setb110()
}
document.getElementById("c110").oninput = function() {
    c110 = updateNum("c110") / 100
    setc110()
}
function setc111() {
    setb111()
}
document.getElementById("c111").oninput = function() {
    c111 = updateNum("c111") / 100
    setc111()
}
function setc128() {
    setb128()
}
document.getElementById("c128").oninput = function() {
    c128 = updateNum("c128") / 100
    setc128()
}
function setc129() {
    setb129()
}
document.getElementById("c129").oninput = function() {
    c129 = updateNum("c129") / 100
    setc129()
}

var b21 = b15
var b22 = b21 * c22
var b23 = b21 * c23
var b26 = b21 + b23 + b24 + ac
var b43 = b31 + b32 + b33 + b34 + b35 + b36 + b37 + b38 + b39 + b40 + b41 + b42 + hch
var b69 = b46 + b47 + b48 + b49 + b50 + b51 + b52 + b53 + b54 + b55 + b56 + b57 + b58 + b59 + b60 + b61 + b62 + b63 + b64 + b65 + b66 + b67 + b68 + hcv
var b70 = b69 + b43
var b79 = b74 + b75 + b76 + b77 + b78 + sc
var b83 = c83 * b21 / 12 * f15
var b84 = c84 * b21 / 12 * f16
var b88 = b83 + b84 + b85 + b86 + b87 + hc
var b92 = f94 * f95
var b93 = f96
var b98 = f101 * f102 * c98
var b99 = f105
var b105 = b92 + b93 + b94 + b98 + b99 + b100 + fc
var f93 = b21 * g93
var g93 = 1 - c22
var f94 = f93 * g94 / 12
var f96 = f93 * g96
var f99 = f100 + f93
var f100 = b70 * g100
var f101 = f99 * g101 / 12
var f103 = (b26 + b70 + b79 + b88 + b115) * e103
var f104 = e104 * b120
var f105 = f99 * g105
var b109 = c109 * b120
var b110 = c110 * b120
var b111 = c111 * b120
var b115 = b109 + b110 + b111 + b112 + b113 + b114
var b120 = e119 * b8
var b121 = b115
var b122 = b120 - b121
var b127 = (3150 + 2125 + 2100 + 2125) * d127
var b128 = b127 * c128
var b129 = d127 * b21 * c129 / 12
var b130 = b127 - b128 - b129
var b134 = b26
var b135 = b88
var b136 = b70
var b137 = b79
var b138 = b105
var b139 = b115
var b140 = b134 + b135 + b136 + b137 + b138 + b139
var e134 = b134 / b8
var e135 = b135 / b8
var e136 = b136 / b8
var e137 = b137 / b8
var e138 = b138 / b8
var e139 = b139 / b8
var e140 = e134 + e135 + e136 + e137 + e138 + e139
var b144 = b122 + b130
var b145 = b26 + b70 + b79 + b88 + b105 + b115
var b146 = b144 - b145
var b147 = b146 / b145
var b151 = b22 + b23 + b24 + b92 + b93 + b94 + b83 + (b86 + b87) * f15
var b152 = b79 + b84 + b98 + b99 + b100 + (b86 + b87) * f16
var b153 = b151 + b152
var b154 = b146 / b153

function setb21() {
    b21 = b15
    document.getElementById("b21").innerHTML = b21.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb22()
    setb23()
    setb26()
    setb83()
    setb84()
    setf93()
    setb129()
}
function setb22() {
    b22 = b21 * c22
    document.getElementById("b22").innerHTML = b22.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb151()
}
function setb23() {
    b23 = b21 * c23
    document.getElementById("b23").innerHTML = b23.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb26()
    setb151()
}
function setb26() {
    b26 = b21 + b23 + b24 + ac
    document.getElementById("b26").innerHTML = b26.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf103()
    setb134()
    setb145()
}
function setb43() {
    b43 = b31 + b32 + b33 + b34 + b35 + b36 + b37 + b38 + b39 + b40 + b41 + b42 + hch
    document.getElementById("b43").innerHTML = b43.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb70()
}
function setb69() {
    b69 = b46 + b47 + b48 + b49 + b50 + b51 + b52 + b53 + b54 + b55 + b56 + b57 + b58 + b59 + b60 + b61 + b62 + b63 + b64 + b65 + b66 + b67 + b68 + hcv
    document.getElementById("b69").innerHTML = b69.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb70()
}
function setb70() {
    b70 = b69 + b43
    document.getElementById("b70").innerHTML = b70.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf100()
    setf103()
    setb136()
    setb145()
}
function setb79() {
    b79 = b74 + b75 + b76 + b77 + b78 + sc
    document.getElementById("b79").innerHTML = b79.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf103()
    setb137()
    setb145()
    setb152()
}
function setb83() {
    b83 = c83 * b21 / 12 * f15
    document.getElementById("b83").innerHTML = b83.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb88()
    setf103()
    setb151()
}
function setb84() {
    b84 = c84 * b21 / 12 * f16
    document.getElementById("b84").innerHTML = b84.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb88()
    setb152()
}
function setb88() {
    b88 = b83 + b84 + b85 + b86 + b87 + hc
    document.getElementById("b88").innerHTML = b88.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf103()
    setb135()
    setb145()
}
function setb92() {
    b92 = f94 * f95
    if (b92 == 0) b92 = 0
    document.getElementById("b92").innerHTML = b92.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb105()
    setb151()
}
function setb93() {
    b93 = f96
    document.getElementById("b93").innerHTML = b93.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb105()
    setb151()
}
function setb98() {
    b98 = f101 * f102 * c98
    document.getElementById("b98").innerHTML = b98.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb105()
    setb152()
}
function setb99() {
    b99 = f105
    document.getElementById("b99").innerHTML = b99.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb105()
    setb152()
}
function setb105() {
    b105 = b92 + b93 + b94 + b98 + b99 + b100 + fc
    document.getElementById("b105").innerHTML = b105.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb138()
    setb145()
}
function setf93() {
    f93 = b21 * g93
    document.getElementById("f93").innerHTML = f93.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf94()
    setf96()
    setf99()
}
function setg93() {
    g93 = 1 - c22
    document.getElementById("g93").innerHTML = (g93 * 100).toLocaleString(undefined, {maximumFractionDigits: 2})
    setf93()
}
function setf94() {
    f94 = f93 * g94 / 12
    document.getElementById("f94").innerHTML = f94.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb92()
}
function setf96() {
    f96 = f93 * g96
    document.getElementById("f96").innerHTML = f96.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb93()
}
function setf99() {
    f99 = f100 + f93
    document.getElementById("f99").innerHTML = f99.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf101()
    setf105()
}
function setf100() {
    f100 = b70 * g100
    document.getElementById("f100").innerHTML = f100.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf99()
}
function setf101() {
    f101 = f99 * g101 / 12
    document.getElementById("f101").innerHTML = f101.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb98()
}
function setf103() {
    f103 = (b26 + b70 + b79 + b88 + b115) * e103
    document.getElementById("f103").innerHTML = f103.toLocaleString(undefined, {maximumFractionDigits: 2})
}
function setf104() {
    f104 = e104 * b120
    document.getElementById("f104").innerHTML = f104.toLocaleString(undefined, {maximumFractionDigits: 2})
}
function setf105() {
    f105 = f99 * g105
    document.getElementById("f105").innerHTML = f105.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb99()
}
function setb109() {
    b109 = c109 * b120
    document.getElementById("b109").innerHTML = b109.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb115()
}
function setb110() {
    b110 = c110 * b120
    document.getElementById("b110").innerHTML = b110.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb115()
}
function setb111() {
    b111 = c111 * b120
    document.getElementById("b111").innerHTML = b111.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb115()
}
function setb115() {
    b115 = b109 + b110 + b111 + b112 + b113 + b114
    document.getElementById("b115").innerHTML = b115.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf103()
    setb121()
    setb139()
    setb145()
}
function setb120() {
    b120 = e119 * b8
    document.getElementById("b120").innerHTML = b120.toLocaleString(undefined, {maximumFractionDigits: 2})
    setf104()
    setb109()
    setb110()
    setb111()
    setb122()
}
function setb121() {
    b121 = b115
    document.getElementById("b121").innerHTML = b121.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb122()
}
function setb122() {
    b122 = b120 - b121
    document.getElementById("b122").innerHTML = b122.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb144()
}
function setb127() {
    b127 = (3150 + 2125 + 2100 + 2125) * d127
    document.getElementById("b127").innerHTML = b127.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb128()
    setb130()
}
function setb128() {
    b128 = b127 * c128
    document.getElementById("b128").innerHTML = b128.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb130()
}
function setb129() {
    b129 = d127 * b21 * c129 / 12
    document.getElementById("b129").innerHTML = b129.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb130()
}
function setb130() {
    b130 = b127 - b128 - b129
    document.getElementById("b130").innerHTML = b130.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb144()
}
function setb134() {
    b134 = b26
    document.getElementById("b134").innerHTML = b134.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb140()
    sete134()
}
function setb135() {
    b135 = b88
    document.getElementById("b135").innerHTML = b135.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb140()
    sete135()
}
function setb136() {
    b136 = b70
    document.getElementById("b136").innerHTML = b136.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb140()
    sete136()
}
function setb137() {
    b137 = b79
    document.getElementById("b137").innerHTML = b137.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb140()
    sete137()
}
function setb138() {
    b138 = b105
    document.getElementById("b138").innerHTML = b138.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb140()
    sete138()
}
function setb139() {
    b139 = b115
    document.getElementById("b139").innerHTML = b139.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb140()
    sete139()
}
function setb140() {
    b140 = b134 + b135 + b136 + b137 + b138 + b139
    document.getElementById("b140").innerHTML = b140.toLocaleString(undefined, {maximumFractionDigits: 2})
}
function sete134() {
    e134 = b134 / b8
    document.getElementById("e134").innerHTML = e134.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete140()
}
function sete135() {
    e135 = b135 / b8
    document.getElementById("e135").innerHTML = e135.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete140()
}
function sete136() {
    e136 = b136 / b8
    document.getElementById("e136").innerHTML = e136.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete140()
}
function sete137() {
    e137 = b137 / b8
    document.getElementById("e137").innerHTML = e137.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete140()
}
function sete138() {
    e138 = b138 / b8
    document.getElementById("e138").innerHTML = e138.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete140()
}
function sete139() {
    e139 = b139 / b8
    document.getElementById("e139").innerHTML = e139.toLocaleString(undefined, {maximumFractionDigits: 2})
    sete140()
}
function sete140() {
    e140 = e134 + e135 + e136 + e137 + e138 + e139
    document.getElementById("e140").innerHTML = e140.toLocaleString(undefined, {maximumFractionDigits: 2})
}
function setb144() {
    b144 = b122 + b130
    document.getElementById("b144").innerHTML = b144.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb146()
}
function setb145() {
    b145 = b26 + b70 + b79 + b88 + b105 + b115
    document.getElementById("b145").innerHTML = b145.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb146()
    setb147()
}
function setb146() {
    b146 = b144 - b145
    document.getElementById("b146").innerHTML = b146.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb147()
    setb154()
}
function setb147() {
    b147 = b146 / b145
    document.getElementById("b147").innerHTML = (b147 * 100).toLocaleString(undefined, {maximumFractionDigits: 2})
}
function setb151() {
    b151 = b22 + b23 + b24 + b92 + b93 + b94 + b83 + (b86 + b87) * f15
    document.getElementById("b151").innerHTML = b151.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb153()
}
function setb152() {
    b152 = b79 + b84 + b98 + b99 + b100 + (b86 + b87) * f16
    document.getElementById("b152").innerHTML = b152.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb153()
}
function setb153() {
    b153 = b151 + b152
    document.getElementById("b153").innerHTML = b153.toLocaleString(undefined, {maximumFractionDigits: 2})
    setb154()
}
function setb154() {
    b154 = b146 / b153
    document.getElementById("b154").innerHTML = (b154 * 100).toLocaleString(undefined, {maximumFractionDigits: 2})
}