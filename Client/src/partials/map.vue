<template>
    <div id="map">
        <i class="material-icons" :style="{transform: 'rotate('+heading+'deg)'}">navigation</i>
        <div id="maps" style="width: 300px; height: 300px;"></div>
    </div>

</template>
<script type="text/babel">

    import gmaps from 'gmaps';

    var map = null;

    var test = (lat, lang) => {
        map.panTo(new google.maps.LatLng(lat, lang));
    }

    export default{
        props:['latitude', 'longitude', 'heading'],
        data(){
            return {
                map: null
            }
        },
        watch:{
            latitude(){
                this.pan();
            }
        },
        methods:{
            pan(){
                test(this.latitude, this.longitude);

            }
        },
        ready(){

        }
    }
</script>