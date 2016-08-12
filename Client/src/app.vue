<template>
    <ul>
        <li>Longitude: {{data[0][0]}}</li>
        <li>Latitude: {{data[0][1]}}</li>
        <li>Heading: {{data[0][2]}}</li>
        <li>Engine Load: {{data[1][0]}}</li>
        <li>Engine RPM: {{data[1][1]}}</li>
        <li>Engine Speed: {{data[1][2]}}</li>
        <li>Coolant: {{data[1][3]}}</li>
    </ul>
    <div style="width: 300px; height: 300px;">
    <maps :center.sync="center"></maps>
        </div>
</template>

<script type="text/babel">

    import {load, Map, Marker} from 'vue-google-maps'

    load(null,'3.24');


    export default{
        components:{
            maps: Map
        },
        data(){
            return {
                center: {lat: 39.927482, lng: 32.888711},
                status: false,
                data: [
                    [
                        -33.315629, //longitude
                        47.785156, //latitude
                        30 //heading
                    ],
                    [
                        false, //load
                        false, //rpm
                        false, //speed
                        false //coolant
                    ]
                ]
            }
        },
        sockets: {
            data(data){
                this.data = data;
                console.log(data);
            },
            status(status){
                console.log(status);
                this.status = status;
            },
            list(list){
                console.log(list);
            }
        }
    }
</script>