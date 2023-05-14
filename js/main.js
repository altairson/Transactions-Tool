$(document).ready(function() {
    const api_key_erc = "QF6QYVMQEIKJF1VAKHUPNDMC1A92V23XET"
    const api_key_bep = "SRJH6NTTGU3WTCAZMF1Z22UG2K49T8QI1B"

    $("#search").click(function() {
        fetchData();
    })

    function fetchData() {
        let address = $("#address").val(); // 0xa82b667f1263adffd04ca41b62baa5bb7f10392e
        let contract = $("#contract").val(); // 0x34be5b8c30ee4fde069dc878989686abe9884470
        let contract_parameter = contract == "" ? "" : "&contractaddress=" + contract;

        let base_url_erc = `https://api.etherscan.io/api?module=account&action=tokentx${contract_parameter}&address=${address}&startblock=0&endblock=27025780&sort=asc&apikey=${api_key_erc}`;

        let base_url_bep = `https://api.bscscan.com/api?module=account&action=tokentx${contract_parameter}&address=${address}&startblock=0&endblock=27025780&sort=asc&apikey=${api_key_bep}`;

        let api_call_url = $("#network").val() == "0" ? base_url_bep : base_url_erc;

        console.log(api_call_url);

        var obj;
        fetch(api_call_url)
            .then(res => res.json())
            .then(data => {
            obj = data;
        })
        .then(() => {
            if (obj.status == '1') {
                displayData(obj)
            }
            else {
                alert(obj.message);
            }
        });
    }

    function displayData(data) {
        console.log(data[0]);
        // for(let i = 0; i < data[0].length; i++) {
        // }

        let headers = Object.keys(data.result[0]);
        let hidden_rows = ["Blockno", "UnixTimestamp", "USDValueDayOfTx"];
        let header_row = `<tr><th>Index</th>`;
        for(let k = 0; k < headers.length; k++) {
            header_row += `<th class="${hidden_rows.includes(headers[k]) ? "hidden" : "visible"}">${headers[k]}</th>`;
        }

        let rows = "";
        for(let i = 1; i < data.result.length; i++) {
            rows += `<td>${i + 1}</td><td>${data.result[0].hash}</td><td>${data.result[0].hash}</td><td>${data.result[0].hash}</td><td>${data.result[0].hash}</td><td>${}</td><td>${}</td><td>${}</td><td>${}</td>`;
        }
    }
});