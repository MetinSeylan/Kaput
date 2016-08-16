<template xmlns="http://www.w3.org/1999/xhtml">
    <ul>
        <li>Longitude: {{data[0][0]}}</li>
        <li>Latitude: {{data[0][1]}}</li>
        <li>Heading: {{data[0][2]}}</li>
        <li>Engine Load: {{data[1][0]}}%</li>
        <li>Engine RPM: {{data[1][1]}}</li>
        <li>Speed: {{data[1][2]}}<sup>km/h</sup></li>
        <li>Coolant: {{data[1][3]}}<sup>C</sup></li>
    </ul>

    <ul>
        <li v-if="!status" v-for="l in list">
            <button @click="replay(l._id)">{{l.created_at}}</button>
        </li>
    </ul>

    <div v-if="player.status != 3 && !status" style="max-width: 500px">
        <slider v-if="player.size" :max.sync="player.size" :value.sync="player.frame" style="width: 400px;"></slider>

        <p>{{time(player.frame)}} / {{time(player.size)}}</p>
    </div>

    <div id="speed" v-if="player.status != 3 && !status">
        <div>
            <button @click="pause()">pause</button>
            <button @click="play()">play</button>
            <button @click="stop()">stop</button>
        </div>

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

<style type="style/sass" lang="sass">
    @import "style"
</style>

<script type="text/babel">
    import {load, Map, Marker} from 'vue-google-maps';
    load(null,'3.24');

    import slider from './partials/slider.vue';

    export default{
        components:{
            slider: slider,
            maps: Map
        },
        data(){
            return {
                player: {
                    status: 3,
                    speed: 1,
                    play: false,
                    size: 0,
                    frame: 0
                },
                maps: {
                    center: {"lat": 47.785156, "lng": -33.315629},
                    zoom: 16
                },
                list: [],
                status: false,
                data: [
                    [
                        -33.315629, //longitude
                        47.785156, //latitude
                        30 //heading
                    ],
                    [
                        0, //load
                        0, //rpm
                        0, //speed
                        0 //coolant
                    ]
                ]
            }
        },
        events: {
            pause(){
                this.pause();
            },
            play(){
                this.play();
            },
            setFrame(id){
                this.frame(id);
            }
        },
        methods: {
            replay(id){
                this.$socket.emit('replay', id);
            },
            frame(id){
                this.$socket.emit('change_frame', id);
            },
            pause(){
                this.$socket.emit('player_pause');
            },
            play(){
                this.$socket.emit('player_play');
            },
            stop(){
                this.$socket.emit('player_stop');
                this.player.size = 0;
                this.player.frame = 0;
            },
            speed(speed){
                this.replay_speed = speed;
                this.$socket.emit('player_speed', speed);
            },
            time(size){
                let min = Math.floor((size / 4).toFixed(0) / 60);
                let sec = String(((size / 4).toFixed(0) - (min * 60)));

                let pad = String("00").substring(0, 2 - sec.length) + sec;

                return min + ':' + pad;
            }
        },
        sockets: {
            data(data){
                this.data = data.data;
                this.player.frame = data.frame;
                this.maps.center.lat = data.data[0][1];
                this.maps.center.lng = data.data[0][0];
            },
            status(status){
                this.status = status;
            },
            list(list){
                this.list = list;
            },
            playerStatus(status){
                this.player.status = status;
            },
            playerInfo(data){
                this.player.size = data.size;
            }
        }
    }
</script>