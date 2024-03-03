<template>
    <div class="row align-middle">
        <div class="card col-xxl-3 col-md-5 col-sm-12 m-2">
            <img src="/../images/public.png" class="card-img-top" alt="cover public schedules">
            <div class="card-body">
                <h5 class="card-title">Public Schedules</h5>
                <p class="card-text">View schedules others have made.</p>
                <a href="/schedules/publicschedules" class="btn btn-primary">Go To Public Schedules</a>
            </div>
        </div>

        <div class="card col-xxl-3 col-md-5 col-sm-12 m-2">
            <img src="/../images/private.png" class="card-img-top" alt="cover private schedules">
            <div class="card-body">
                <h5 class="card-title">Private Schedules</h5>
                <p class="card-text">View schedules you made yourself</p>
                <a href="/schedules/ownschedules" class="btn btn-primary">Go To Private Schedules</a>
            </div>
        </div>

        <div class="card col-xxl-3 col-md-5 col-sm-12 m-2">
            <img src="/../images/account.png" class="card-img-top" alt="cover update account">
            <div class="card-body">
                <h5 class="card-title">Update Account</h5>
                <p class="card-text">Did some data change?</p>
                <a href="/account" class="btn btn-primary">Go To your Account</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "InfoCards"
  };
</script>

<style></style>