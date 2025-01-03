<template>
    <div id="my-estate">

        <div class="header-overlay">
            <AppHeader />
        </div>

        <div class="content">
            <div v-if="loading" class="text-center">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <div v-else>
                <v-container v-if="properties.length == 0">
                    <v-col cols="12">
                        <h2>You have not posted any properties yet.</h2>
                        <v-btn @click="openPropertyPostDialog()">Free Post</v-btn>
                    </v-col>
                </v-container>
                <v-container v-else>
                    <v-row class="mb-4">
                        <v-col cols="10">
                            <h2 class="ml-8 d-flex justify-start">My Properties</h2>
                        </v-col>
                        <v-col cols="2"> <v-btn @click="openPropertyPostDialog()">Free Post</v-btn> </v-col>
                    </v-row>
                    <LongCardComponent v-for="property in properties" :key="property._id" :property="property"
                        @edit="editProperty(property)" @delete="deleteProperty(property._id)" />
                </v-container>
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
                                        <div class="ml-4" v-for="(image, index) in PostImages" :key="index">
                                            <v-img :src="image.url" max-width="70" max-height="70"
                                                class="cursor-pointer" @click="triggerFileInput"></v-img>
                                        </div>
                                        <input type="file" ref="fileInput" accept="image/*" style="display: none"
                                            @change="onFilesSelected" multiple />
                                    </v-row>
                                    <v-text-field v-model="newPost.title" label="Title" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="newPost.city" :items="cityItems" label="City"
                                        :rules="rules.required" outlined item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="newPost.district" label="District" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="newPost.status" label="Status" :rules="rules.required" outlined
                                        :items="statusItems" item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="newPost.price" label="Price" type="number" prefix="$"
                                        :rules="rules.required" outlined></v-text-field>

                                </v-col>
                                <v-col class="mt-8">
                                    <v-text-field v-model.number="newPost.bathrooms" label="Bathroom(s)" type="number"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model.number="newPost.bedrooms" label="Bedroom(s)" type="number"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model="newPost.adress" label="Adress" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="newPost.type" label="Type" :rules="rules.required" outlined
                                        :items="typeItems" item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="newPost.description" class="desc" label="Description"
                                        type="text" :rules="rules.required" outlined></v-text-field>
                                </v-col>

                            </v-row>

                            <div style="display: flex; justify-content: end;">
                                <v-btn @click="postPropertyButton" color="#010237C4"
                                    style="border: 1px solid black; color: white;">
                                    Post Free
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="editDialog">
                <v-card>
                    <v-card-title>Edit Property</v-card-title>
                    <v-card-text>
                        <v-form ref="editForm" v-model="formValid">
                            <v-row max-width="150">
                                <v-col class="mt-12">
                                    <v-row class="mb-4">
                                        <div class="ml-4" v-for="(image, index) in PostImages" :key="index">
                                            <v-img :src="image.url" max-width="70" max-height="70"
                                                class="cursor-pointer" @click="triggerFileInput"></v-img>
                                        </div>
                                        <input type="file" ref="fileInput" accept="image/*" style="display: none"
                                            @change="onFilesSelected" multiple name="images"/>
                                        
                                    </v-row>
                                    <v-text-field v-model="editPost.title" label="Title" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="editPost.location.city" :items="cityItems" label="City"
                                        :rules="rules.required" outlined item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="editPost.location.district" label="District" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="editPost.status" label="Status" :rules="rules.required" outlined
                                        :items="statusItems" item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="editPost.price" label="Price" type="number" prefix="$"
                                        :rules="rules.required" outlined></v-text-field>
                                </v-col>

                                <v-col class="mt-8">
                                    <v-text-field v-model.number="editPost.bathrooms" label="Bathroom(s)" type="number"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model.number="editPost.bedrooms" label="Bedroom(s)" type="number"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-text-field v-model="editPost.location.address" label="Adress" type="text"
                                        :rules="rules.required" outlined></v-text-field>
                                    <v-select v-model="editPost.type" label="Type" :rules="rules.required" outlined
                                        :items="typeItems" item-text="text" item-value="value"></v-select>
                                    <v-text-field v-model="editPost.description" class="desc" label="Description"
                                        type="text" :rules="rules.required" outlined></v-text-field>
                                </v-col>
                            </v-row>

                            <div style="display: flex; justify-content: end;">
                                <v-btn @click="editPropertyButton" color="#010237C4"
                                    style="border: 1px solid black; color: white;">
                                    Edit
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="detailPropertyDialog" class="popup-dialog" max-width="500"></v-dialog>
            <error-dialog ref="errorDialog" :error="errorData" />
        </div>
    <AppFooter />
    </div>
</template>

<script>
import AppHeader from "@/components/_Layout/AppHeader.vue";
import ErrorDialog from "@/components/Widgets/WarningDialog.vue";
import LongCardComponent from '@/components/Widgets/LongCardComponent.vue';
import axios from "@/plugins/axios";
import AppFooter from "@/components/_Layout/AppFooter.vue";

export default {
    name: "MyEstatePage",
    components: {
        AppFooter,
        AppHeader,
        ErrorDialog,
        LongCardComponent,
    },
    data() {
        const dummyImageUrl = require("@/assets/dummyUploadPNG.png");
        return {
            PostImages: Array(4).fill({ url: dummyImageUrl, file: null }),
            errorData: { type: "", message: "" },
            newPost: {
                city: "",
                district: "",
                status: "",
                title: "",
                zip: "",
                type: "",
                price: "",
                bathrooms: "",
                bedrooms: "",
                adress: "",
                description: "",
            },
            editPost: {
                location: {
                    city: "",
                    district: "",
                    address: "",
                },
                type: "",
                title: "",
                status: "",
                price: "",
                bathrooms: "",
                bedrooms: "",
                description: "",
                images: Array(4).fill({ url: dummyImageUrl, file: null }),
            },
            loading: false,
            properties: [],
            editDialog: false,
            propertyPostDialog: false,
            detailPropertyDialog: false,
            formValid: false,
            rules: {
                required: [(v) => !!v || "This field is required"]
            },
            cityItems: [{ value: "Istanbul", text: "İstanbul" },
            { value: "Ankara", text: "Ankara" },
            { value: "Manisa", text: "Manisa" },
            ],
            typeItems: [{ value: "apartment", text: "Apartment" },
            { value: "villa", text: "Villa" },
            { value: "house", text: "House" },
            { value: "land", text: "Land" },
            ],
            statusItems: [{ value: "for-sale", text: "For Sale" },
            { value: "for-rent", text: "For Rent" },
            { value: "sold", text: "Sold" },
            { value: "rented", text: "Rented" },
            ],
        };
    },
    mounted() {
        this.checkUserLogin();
        this.fetchMyProperties();
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
        async fetchMyProperties() {
            this.loading = true;
            try {
                const response = await axios.get("api/property/my");
                this.properties = response.data.properties;
                console.log("My properties:", this.properties);
            } catch (error) {
                this.showErrorDialog("Error", "Failed to fetch properties");
                console.log("Fetch my properties error:", error);
            } finally {
                this.loading = false;
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
                            this.$set(this.PostImages, index, {
                                url: e.target.result, // Yüklenen dosyanın önizleme URL'si
                                file: file,          // Dosya objesi
                            });
                        };
                        reader.readAsDataURL(file);
                    }
                });
            } catch (error) {
                this.showErrorDialog("Error", "Failed to process files.");
                console.log("File processing error:", error);
            }

        },
        async postPropertyButton() {
            if (!this.formValid) {
                this.showErrorDialog("Info","Form is invalid");
                return;
            }
            try {
                const processedImages = this.PostImages
            .filter(image => image && image.file) // Remove nulls and empty objects
            .map(image => {
                // If it's a File object or base64 string, return it directly
                if (image.file instanceof File) {
                    return image.file;
                }
                // If it's a URL string, return the URL
                if (typeof image.url === 'string') {
                    return image.url;
                }
                return null;
            })
            .filter(Boolean);

                const payload = {
                    location: {
                        city: this.newPost.city,
                        district: this.newPost.district,
                        address: this.newPost.adress,
                    },
                    type: this.newPost.type,
                    title: this.newPost.title,
                    status: this.newPost.status,
                    price: this.newPost.price,
                    bathrooms: this.newPost.bathrooms,
                    bedrooms: this.newPost.bedrooms,
                    description: this.newPost.description,
                    images: processedImages
                };
                console.log("Post property payload:", payload);
                const response = await axios.post('api/property', payload);
                console.log("Property posted successfully:", response.data);
                this.propertyPostDialog = false;
                window.location.reload();
            } catch (error) {
                this.showErrorDialog("Error", "Failed to post property.");
                console.log("Post property error:", error);
            }
        },
        async editPropertyButton() {
            if (!this.formValid) {
                this.showErrorDialog("Info","Form is invalid");
                return;
            }

            try {
                const payload = {
                    location: {
                        city: this.editPost.location.city,
                        district: this.editPost.location.district,
                        address: this.editPost.location.adress,
                    },
                    type: this.editPost.type,
                    title: this.editPost.title,
                    status: this.editPost.status,
                    price: this.editPost.price,
                    bathrooms: this.editPost.bathrooms,
                    bedrooms: this.editPost.bedrooms,
                    description: this.editPost.description,
                    images: this.editPost.images
                .filter(img => img && img.url)
                .map(img => img.url)
                };
                console.log("Edit property payload:", payload);
                const response = await axios.put(`api/property/${this.editPost._id}`, payload);
                console.log("Property edited successfully:", response.data);
                window.location.reload();
            } catch (error) {
                this.showErrorDialog("Error", "Failed to edit property.");
                console.log("Edit property error:", error);
            }
        },
        async deleteProperty(id) {
            if (confirm('Are you sure you want to delete this property?')) {
                try {
                    await axios.delete(`/api/property/${id}`)
                    this.properties = this.properties.filter(p => p._id !== id)
                } catch (error) {
                    console.error('Error deleting property:', error)
                }
            }
        },
        async editProperty(property) {
            this.editDialog = true;
            this.editPost = {
                ...property,
                location: {
                    city: property.location?.city || '',
                    district: property.location?.district || '',
                    address: property.location?.address || ''
                },
                type: property.type || '',
                title: property.title || '',
                status: property.status || '',
                price: Number(property.price) || 0,
                bathrooms: Number(property.bathrooms) || 0,
                bedrooms: Number(property.bedrooms) || 0,
                description: property.description || '',
                features: property.features || {},
                _id: property._id // Ensure ID is copied
            };

            // Initialize images array
            this.editPost.images = Array(4).fill(null).map((_, index) => {
                if (property.images && property.images[index]) {
                    return {
                        url: property.images[index].url || property.images[index],
                        file: null // Reset file since we're editing
                    };
                }
                return {
                    url: this.dummyImageUrl,
                    file: null
                };
            });

            console.log("Editing property:", this.editPost);
        },
    }
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
