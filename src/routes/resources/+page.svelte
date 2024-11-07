<script>
    let resources = [
      { name: "Learn/apply for SNAP", link: "http://foodhelp.nyc/snapfood-benefits-en/", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Supplemental_Nutrition_Assistance_Program_logo.svg/1200px-Supplemental_Nutrition_Assistance_Program_logo.svg.png" },
      { name: "Find food pantries", link: "https://www1.nyc.gov/apps/311utils/providerInformation.htm?serviceId=1083", img: "https://i.ya-webdesign.com/images/food-pantry-png-4.png" },
      { name: "Donate food", link: "https://www.amny.com/news/nyc-food-donation-1.14906516", img: "http://www.hawaiifoodbank.org/websites/foodbank/photogallery/5809684/donate%20food.jpg" },
      { name: "Food Waste Fair", link: "https://www.foodwastefair.nyc/", img: "https://foodtank.com/wp-content/uploads/2017/07/1498853730083.png" },
    ];
  </script>
  
  <div class="resources">
    <h1>Resources</h1>
    <div class="resources-wrapper">
      {#each resources as resource}
        <a href={resource.link} target="_blank" rel="noopener noreferrer" class="resource-item">
          <img src={resource.img} alt={resource.name} />
          <p>{resource.name}</p>
        </a>
      {/each}
    </div>
  </div>
  
  <style>
    .resources {
      text-align: center;
      padding: 2em;
    }
  
    .resources-wrapper {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  
    .resource-item {
      margin: 1em;
      text-decoration: none;
      color: inherit;
    }
  
    .resource-item img {
      width: 150px;
      height: auto;
    }
  </style>
  