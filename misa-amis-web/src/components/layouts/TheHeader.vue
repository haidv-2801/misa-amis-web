<template>
    <div class="header">
        <div class="header__region">
            <div class="region__icon--toggle icon-toggle"></div>
            <div class="region__dropdown">
                <div class="dropdown__title">
                    CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
                </div>
                <div class="region__icon--toggle icon-arrow-down"></div>
            </div>
        </div>

        <!-- header right -->
        <div class="header__right">
            <!-- icon bell -->
            <div class="icon icon-bell"></div>
            <div class="icon icon-user"></div>
            <div title="Người dùng" class="right__item header_username">
                Đỗ Văn Hải
            </div>
            <!-- icon arrow down -->
            <div class="icon icon-chervon-down"></div> 
        </div>
    </div>
</template>

<script>
export default {
    name:'Header',
    setup() {
        
    },
}
</script>

<style scoped>
    @import url("../../assets/css/common/header.css");
</style>