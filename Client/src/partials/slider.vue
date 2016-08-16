<template>
    <div></div>
</template>

<script>
    import slider from 'nouislider'

    export default{
        props: [
            'max',
            'value'
        ],
        data(){
            return {
                range: null
            }
        },
        ready(){
            this.run();
        },
        methods: {
            run(){
                this.range = slider.create(this.$el, {
                    step: 1,
                    animate: false,
                    connect: 'lower',
                    start: [1],
                    range: {
                        'min': 0,
                        'max': this.max
                    },
                    format: {
                        to: function (value) {
                            return value;
                        },
                        from: function (value) {
                            return value;
                        }
                    }
                });

                let _this = this;

                this.range.on('start', () => {
                    _this.$dispatch('pause');
                });

                this.range.on('end', () => {
                    _this.$dispatch('play');
                });

                this.range.on('slide', (data) => {
                    _this.$dispatch('setFrame', parseInt(data[0]));
                });


            },
            destroy(){
                this.range.destroy();
            }
        },
        watch: {
            value(value){
                this.range.set([value]);
            },
            max(){
                this.destroy();
                this.run();
            }
        }
    }
</script>
