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

    <div v-if="play">
        <ul>
            <button @click="speed(1)">1x</button>
        </ul>
        <ul>
            <button @click="speed(2)">2x</button>
        </ul>
        <ul>
            <button @click="speed(3)">3x</button>
        </ul>
        <ul>
            <button @click="speed(4)">4x</button>
        </ul>
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