<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

class SalesTeamController extends AbstractController
{

    /*
    Endpoint: /api/sales_team/search
    Purpose: Return sales team member data, includes built-in filtering if parameter is provided
    Usage Example: /api/sales_team/search?search=${searchTerm}`
    */
    #[Route(path: '/api/sales_team/search', name: 'search_sales_team')]
    public function searchAction(Request $request): Response
    {
        //Retrieve all sales team info.
        $filePath = $this->getParameter('kernel.project_dir') . '/src/Data/mock_sales_team.json';
        $jsonData = file_get_contents($filePath);
        $salesTeamData = json_decode($jsonData, true);

        //Get the search term from parameters/
        $searchTerm = $request->query->get('search');

        //Filter sales team data based on search term.
        if ($searchTerm !== null) {
            $filteredSalesTeamData = array_filter($salesTeamData, function ($member) use ($searchTerm) {
                return stripos($member['name'], $searchTerm) !== false;
            });
        } else {
            //No search term given, return all team members
            $filteredSalesTeamData = $salesTeamData;
        }

        return $this->json($filteredSalesTeamData);
    }

    //Redundant old approach
    /*
    #[Route(path: '/api/sales_team', name: 'get_sales_team')]
    public function indexAction(): Response
    {
        //Retrieve all sales team info.
        $filePath = $this->getParameter('kernel.project_dir') . '/src/MockData/mock_sales_team.json';
        $jsonData = file_get_contents($filePath);

        return $this->json(json_decode($jsonData, true));
        
    }
    */
}