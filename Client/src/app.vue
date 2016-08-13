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
        <li v-if="!status" v-for="l in list">
            <button @click="replay(l._id)">{{l.created_at}}</button>
        </li>
    </ul>

    <div id="speed" v-if="play">
        <ul>
            <li>
                <button @click="speed(1)">1x</button>
            </li>
            <li>
                <button @click="speed(2)">2x</button>
            </li>
            <li>
                <button @click="speed(3)">3x</button>
            </li>
            <li>
                <button @click="speed(4)">4x</button>
            </li>
        </ul>
    </div>

    <div id="map">
        <i class="material-icons" :style="{transform: 'rotate('+data[0][2]+'deg)'}">navigation</i>
        <maps :center.sync="maps.center" :zoom.sync="maps.zoom"></maps>
    </div>


</template>

<style lang="sass">

    #map{
        text-align:center;
        position:relative;
        height: 400px;

        i {
            position:absolute;
            z-index: 9999;
            line-height: 400px;
    } }

        #speed{
            li {
                display:inline;
        }
    }

</style>

<script type="text/babel">
    import {load, Map, Marker} from 'vue-google-maps'
    load(null,'3.24');

    export default{
        components:{
            maps: Map
        },
        data(){
            return {
                maps: {
                    center: {"lat": 47.785156, "lng": -33.315629},
                    zoom: 16
                },
                list: [],
                status: false,
                play: false,
                replay_speed: 1,
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
            },
            speed(speed){
                this.replay_speed = speed;
                this.$socket.emit('replay_speed', speed);
            }
        },
        sockets: {
            data(data){
                console.log(data);
                this.data = data;
                this.maps.center.lat = data[0][1];
                this.maps.center.lng = data[0][0];
            },
            status(status){
                this.status = status;
            },
            list(list){
                this.list = list;
            },
            play(status){
                this.play = status;
            }
        }
    }
</script>