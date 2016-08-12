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

    <ul>
        <li v-for="l in list">
            <button @click="replay(l._id)">{{l.created_at}}</button>
        </li>
    </ul>
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
                list: [],
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
        methods: {
            replay(id){
                this.$socket.emit('replay', id);
            }
        },
        sockets: {
            data(data){
                console.log(data);
                this.data = data;
            },
            status(status){
                this.status = status;
            },
            list(list){
                this.list = list;
            }
        }
    }
</script>