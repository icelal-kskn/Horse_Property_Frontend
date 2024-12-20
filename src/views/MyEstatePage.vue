<template>
    <div id="my-estate">

        <div class="header-overlay">
            <AppHeader />
        </div>

        <div class="content">
            <div v-if="loading" class="loading">Loading...</div>
            <div v-else>
                <v-row v-if="properties.length < 1">
                    <v-col cols="12">
                        <h2>You have not posted any properties yet.</h2>
                        <v-btn @click="openPropertyPostDialog()">Free Post</v-btn>
                    </v-col>
                </v-row>
                <v-row v-else>

                </v-row>
            </div>

            <!-- Yeni Property Dialog -->
            <v-dialog v-model="propertyPostDialog">
                <v-card>
                    <v-card-title>Create New Property</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="formValid">
                            <v-row max-width="150">
                                <v-col class="mt-12">
                                    <v-row class="mb-4">
                                        <div class="ml-4" v-for="(image, index) in images" :key="index">
                                            <v-img :src="image.url" max-width="70" max-height="70"
                                                class="cursor-pointer" @click="triggerFileInput"></v-img>
                                        </div>
                                        <input type="file" ref="fileInput" accept="image/*" style="display: none"
                                            @change="onFilesSelected" multiple />
                                    </v-row>
                                    <v-select v-model="newPost.city" :items="cityItems" label="City" 
                                        :rules="rules.required" outlined
                                        item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="newPost.district" label="District" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="newPost.status" label="Status" :rules="rules.required"
                                        outlined :items="statusItems"
                                        item-text="text" item-value="value"
                                        ></v-select>
                                    <v-text-field v-model="newPost.price" label="Price" type="number" prefix="$"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model.number="newPost.bathrooms" label="Bathroom(s)" type="number"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model.number="newPost.bedrooms" label="Bedroom(s)" type="number"
                                        :rules="rules.required" outlined></v-text-field>
                                </v-col>
                                <v-col class="mt-8">
                                    <v-text-field v-model="newPost.adress" label="Adress" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model="newPost.description" class="desc" label="Description"
                                        type="text" :rules="rules.required" outlined></v-text-field>
                                </v-col>

                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="detailPropertyDialog" class="popup-dialog" max-width="500"></v-dialog>
            <error-dialog ref="errorDialog" :error="errorData" />
        </div>
    </div>
</template>

<script>
import AppHeader from "@/components/_Layout/AppHeader.vue";
import ErrorDialog from "@/components/Widgets/WarningDialog.vue";

export default {
    name: "MyEstatePage",
    components: {
        AppHeader,
        ErrorDialog,
    },
    data() {
        const dummyImageUrl = require("@/assets/dummyUploadPNG.png");
        return {
            images: Array(4).fill({ url: dummyImageUrl, file: null }),
            errorData: { type: "", message: "" },
            newPost: {
                city: "",
                district: "",
                zip: "",
                price: "",
                bathrooms: "",
                bedrooms: "",
                address: "",
                description: "",
            },
            loading: false,
            properties: [],
            propertyPostDialog: false,
            detailPropertyDialog: false,
            formValid: false,
            rules: {
                required: [(v) => !!v || "This field is required"]
            },
            cityItems:[{value:"istanbul" , text: "Istanbul"},
                        {value:"ankara" , text: "Ankara"},
                        {value:"manisa" , text: "Manisa"},
            ],
            statusItems:[{value:"for-sale" , text: "For Sale"},
                        {value:"for-rent" , text: "For Rent"},
                        {value:"sold" , text: "Sold"},
                        {value:"rented" , text: "Rented"},
            ],
        };
    },
    mounted() {
        this.checkUserLogin();
    },
    methods: {
        checkUserLogin() {
            if (!localStorage.getItem("token")) {
                this.showErrorDialog("Error", "You are not logged in. Please sign in to continue.");
                setTimeout(() => {
                    this.$router.push("/");
                }, 2000);
            }
        },
        showErrorDialog(type, message) {
            this.errorData = { type, message };
            this.$refs.errorDialog.show();
        },
        openPropertyPostDialog() {
            this.propertyPostDialog = true;
        },
        triggerFileInput() {
            const fileInput = this.$refs.fileInput;
            if (fileInput) {
                fileInput.click();
            } else {
                this.showErrorDialog("Error", "File input element not found.");
            }
        },

        // Seçilen dosyaları işler
        onFilesSelected(event) {
            const files = Array.from(event.target.files);

            if (files.length > 4) {
                this.showErrorDialog("Error", "You can only upload up to 4 images.");
                files.fill(({ url: this.dummyImageUrl, file: null }))
                return;
            }
            try {
                files.forEach((file, index) => {
                    if (index < 4) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.$set(this.images, index, {
                                url: e.target.result, // Yüklenen dosyanın önizleme URL'si
                                file: file,          // Dosya objesi
                            });
                        };
                        reader.readAsDataURL(file);
                    }
                });
            } catch(error) {
            this.showErrorDialog("Error", "Failed to process files.");
            console.log("File processing error:", error);
        }

    },
},
};
</script>


<style scoped>
#my-estate {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    justify-content: center;
}

.desc {
    margin-top: 0.15rem;
}

.content {
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #E5E7F4;
    margin-bottom: 1rem;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
