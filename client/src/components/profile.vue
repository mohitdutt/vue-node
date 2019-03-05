<template>
  <div class="ui stackable grid container">

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">Edit Profile</h2>

        <!-- <Notification
          :message="notification.message"
          :type="notification.type"
          v-if="notification.message"
        /> -->

        <form class="ui form" @submit.prevent="updateProfile">
          <div class="field">
            <label>Username</label>
            <input type="text" name="username" v-model="username">
          </div>

          <div class="field">
            <label>Email</label>
            <input type="email" name="email" v-model="email" placeholder="Email">
          </div>

          <div class="field">
            <label>Bio</label>
            <textarea v-model="bio" rows="5" placeholder="A breif bio of you"></textarea>
          </div>

          <div class="field">
            <label>Location</label>
            <input type="text" v-model="location" placeholder="Your location">
          </div>

          <div class="field">
            <label>Website URL</label>
            <input type="url" v-model="websiteUrl" placeholder="Website URL">
          </div>

          <button class="ui button primary">Update profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default{
    name: 'profile',
    data() {
      return {
          username: '', email: '', bio: '',location: '', websiteUrl: ''
      };
    },
    
}
</script>