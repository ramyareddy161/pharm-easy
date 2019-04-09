from django.contrib.auth import authenticate
from rest_framework import serializers
from pharm_easy.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name','username','password')
        extra_kwargs = {'password': {'write_only': True}}


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('user','location','contact')
    def create(self,validated_data):
        userdata = validated_data.pop('user')
        user = User.objects.create_user(**userdata)
        profile = UserProfile.objects.create(**validated_data,user=user)
        return profile


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class MedicalShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalShop
        fields = '__all__'


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'


class MyCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyCart
        fields = '__all__'


class MedicineDetailSerializer(serializers.ModelSerializer):
    shop = MedicalShopSerializer()
    class Meta:
        model = Medicine
        fields=["id", "shop", "name", "company", "quantity", "price", "no_of_tablets", "type", "mfg_date", "exp_date"]
    def create(self,validated_data):
        shopdata = validated_data.pop('shop')
        shop = MedicalShop.objects.create(**shopdata)
        medicinedetail = Medicine.objects.create(**validated_data,)
        return medicinedetail


class MyCartDetailSerializer(serializers.ModelSerializer):
    medicine = MedicineSerializer
    user_profile = UserProfileSerializer
    class Meta:
        model = MyCart
        fields = ["id", "total_cost", "date_of_purchase","medicine", "user_profile"]
    def create(self,validated_data):
        medicinedata = validated_data.pop('medicine')
        medicine = Medicine.objects.create(**medicinedata)
        user_profiledata = validated_data.pop('user_profile')
        user_profile = UserProfile.objects.create(**user_profiledata)
        mycartdetail = MyCart.objects.create(**validated_data)
        return mycartdetail


class CreateMedicalShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalShop
        fields = ["name", "owner_name", "location", "contact"]
    def create(self, validated_data):
        medical_shop = MedicalShop.objects.create(**validated_data)
        return medical_shop

class CreateMedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model=Medicine
        fields = ["id", "shop", "name", "company", "quantity", "price", "no_of_tablets", "type", "mfg_date",
                  "exp_date"]
    def create(self, validated_data):
        shop_id=self.context['request'].shop.id
        shop = MedicalShop.objects.get(shop_id=shop_id)
        medicine = Medicine.objects.create(shop=shop,**validated_data,)
        return medicine


class CreateMyCartSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyCart
        fields= ["medicine", "user_profile"]
    def create(self, validated_data):
        user_id=self.context['user_id']
        user = User.objects.get(id=user_id)
        user_profile=UserProfile.objects.get(user=user)
        medicine_id = self.context['medicine_id']
        medicine=Medicine.objects.get(id=medicine_id)
        my_cart=MyCart.objects.create(medicine=medicine,**validated_data,user_profile=user_profile)
        return my_cart

