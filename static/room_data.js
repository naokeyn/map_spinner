// json の読み込み
let room_dict

let requestURL = "static/data.json"
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    room_dict = request.response;
    room_dict = JSON.parse(JSON.stringify(room_dict));
}

const selecter_id = ["fac", "dep", "room"]


// 指定されたエレメントのオプションをクリア
let clear_opt = (elm) => {
    while (0 < elm.childNodes.length) {
        elm.removeChild(elm.childNodes[0]);
    }
}

// 指定されたエレメントに初期値を追加
let set_init = (elm) => {
    let opt0 = document.createElement('option')
    opt0.textContent = "----"
    elm.appendChild(opt0)
    elm[0].setAttribute("disabled", true)
}

// 学部選択にオプションを追加
let add_opt_to_fac = () => {
    const fac_id = document.getElementById("fac")
    
    clear_opt(fac_id)

    items = Object.keys(room_dict)

    for (let i = 0; i < items.length; i++) {
        let opt = document.createElement('option')

        opt.value = items[i]
        opt.textContent = items[i]

        fac_id.appendChild(opt)
    }
}

// オプションが選択されたとき発動
let selected = (key) => {
    // selectedとtargetのidを取得
    let selected_id = selecter_id[key]
    let target_id = selecter_id[key + 1]

    // それぞれのエレメントを取得
    let selected_elm = document.getElementById(selected_id)
    let target_elm = document.getElementById(target_id)

    // 選択された要素を取得
    let selected_val = selected_elm.value

    // 次の要素配列を取得
    let arr
    if (key === 0) {
        arr = Object.keys(room_dict[selected_val])
    }
    else if (key === 1) {
        let dep = document.getElementById(selecter_id[0]).value
        arr = Object.keys(room_dict[dep][selected_val])
    }

    // オプションをクリア
    clear_opt(target_elm)

    if (key === 0) {
        let room = document.getElementById("room")
        clear_opt(room)

        // 初期値を追加
        set_init(room)
    }

    // 初期値を追加
    set_init(target_elm)

    // オプションを追加
    for (let i = 0; i < arr.length; i++) {
        let opt = document.createElement('option')

        opt.value = arr[i]
        opt.textContent = arr[i]

        target_elm.appendChild(opt)
    }

}

let descript = () => {
    const floor_elm = document.getElementById("floor")
    const pointer_elm = document.getElementById("pointer")

    let fac_val = document.getElementById("fac").value
    let dep_val = document.getElementById("dep").value
    let room_val = document.getElementById("room").value

    let floor = room_dict[fac_val][dep_val][room_val]["floor"]
    let pointer = room_dict[fac_val][dep_val][room_val]["pointer"]

    floor_elm.innerHTML = floor
    pointer_elm.innerHTML = pointer

}