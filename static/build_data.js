// json の読み込み
let build_dict

let requestURL2 = "static/build_data.json"
let request2 = new XMLHttpRequest();

request2.open('GET', requestURL2);
request2.responseType = 'json';
request2.send();

request2.onload = function () {
    build_dict = request2.response;
    build_dict = JSON.parse(JSON.stringify(build_dict));
}

const selecter2_id = ["fac2", "build"]

let selected2 = () => {
    const fac2_elm = document.getElementById("fac2")
    const build_elm = document.getElementById("build")

    let fac2_val = fac2_elm.value
    let build_opt = Object.keys(build_dict[fac2_val])

    // オプションをクリア
    clear_opt(build_elm)
    set_init(build_elm)
    
    // 建物のセレクタにオプションを追加
    for(let i=0 ; i<build_opt.length ; i++){
        let opt = document.createElement('option')

        opt.value = build_opt[i]
        opt.textContent = build_opt[i]

        build_elm.appendChild(opt)
    }
}

let descript2 = () => {
    const pointer2_elm = document.getElementById("pointer2")

    let fac2_val = document.getElementById("fac2").value
    let build_val = document.getElementById("build").value

    let pointer2_list = build_dict[fac2_val][build_val]["pointer"]

    pointer2_elm.innerHTML = pointer2_list
}